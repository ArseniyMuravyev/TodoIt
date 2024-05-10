import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../exceptions/api-error";
import { UserModel } from "../models/user-model";
import { saveUserDto } from "../utils/utils";

class UserService {
	async updateUser(id: string, name: string) {
		const user = await UserModel.findById(id);
		if (!user) {
			throw new Error("Пользователь не найден");
		}

		user.name = name;
		return saveUserDto(user);
	}

	async uploadAvatar(id: string, file: UploadedFile) {
		const user = await UserModel.findById(id);
		if (!user) throw ApiError.BadRequestError("Пользователь не найден");

		const avatarDirectory = path.join(__dirname, "..", "static");
		const avatarFilename = uuidv4() + path.extname(file.name);
		const avatarPath = path.join(avatarDirectory, avatarFilename);

		fs.mkdirSync(avatarDirectory, { recursive: true });

		file.mv(avatarPath, (err: unknown) => {
			if (err) throw ApiError.BadRequestError("Не удалось сохранить файл");
		});

		user.avatarName = avatarFilename;
		return saveUserDto(user);
	}

	async deleteAvatar(id: string) {
		const user = await UserModel.findById(id);
		if (!user) throw ApiError.BadRequestError("Пользователь не найден");

		if (user.avatarName) {
			const avatarPath = path.join(
				__dirname,
				"..",
				"static",
				"avatars",
				user.avatarName
			);
			if (fs.existsSync(avatarPath)) {
				fs.unlinkSync(avatarPath);
			}
			user.avatarName = undefined;
			await user.save();
		}
		return;
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
