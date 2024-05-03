import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import { UserModel } from "../models/user-model";
import { mailService } from "./mail-service";
import { tokenService } from "./token-service";

const generateTokensFromDto = async (user: any) => {
	const userDto = new UserDto(user);

	const tokens = tokenService.generateTokens({ ...userDto });
	await tokenService.saveToken(userDto.id, tokens.refreshToken);

	return {
		...tokens,
		user: userDto,
	};
};

class UserService {
	async registration(name: string, email: string, password: string) {
		const hashedPassword = await bcrypt.hash(password, 3);

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			throw ApiError.BadRequestError(
				"Пользователь с такой почтой уже существует"
			);
		}

		const activationLink = uuidv4();

		const user = await UserModel.create({
			email,
			name,
			password: hashedPassword,
			activationLink,
		});

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/auth/activate/${activationLink}`
		);

		return generateTokensFromDto(user);
	}

	async login(email: string, password: string) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ApiError.BadRequestError("Пользователь с такой почтой не найден");
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.BadRequestError("Неверный пароль");
		}

		return generateTokensFromDto(user);
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken) as any;
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		return generateTokensFromDto(user);
	}

	async activate(activationLink: string) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw ApiError.UnauthorizedError();
		}
		user.isActivated = true;
		await user.save();
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}

	async forgotPassword(email: string) {
		const user = await UserModel.findOne({ email });
		const resetCode = String(Math.floor(1000 + Math.random() * 9000));
		if (!user) {
			throw ApiError.BadRequestError("Пользователь с такой почтой не найден");
		}

		user!.resetCode = resetCode;
		await user.save();

		const userDto = new UserDto(user);

		await mailService.sendResetPassword(email, resetCode);
		return userDto;
	}

	async resetPassword(email: string, newPassword: string, resetCode: string) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ApiError.BadRequestError("Пользователь с такой почтой не найден");
		}

		if (resetCode !== user.resetCode) {
			throw ApiError.BadRequestError("Неверный код");
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 3);
		user.password = hashedNewPassword;
		await user.save();

		const userDto = new UserDto(user);
		return userDto;
	}

	async updateUser(id: string, name: string) {
		const user = await UserModel.findById(id);
		if (!user) {
			throw ApiError.BadRequestError("Пользователь не найден");
		}
		user.name = name;
		await user.save();
		const userDto = new UserDto(user);
		return userDto;
	}

	async deleteUser(id: string) {
		const user = await UserModel.findById(id);
		if (!user) {
			throw ApiError.BadRequestError("Пользователь не найден");
		}
		await UserModel.deleteOne({ _id: id });
		return;
	}
}

export const userService = new UserService();
