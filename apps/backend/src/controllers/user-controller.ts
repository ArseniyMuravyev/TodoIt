import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import { userService } from "../services/user-service";

class UserController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			const userData = await userService.login(email, password);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequestError("Ошибка при валидации", errors.array())
				);
			}
			const { name, email, password } = req.body;
			const userData = await userService.registration(name, email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (error) {
			next(error);
		}
	}

	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		} catch (error) {
			next(error);
		}
	}

	async forgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const user = await userService.forgotPassword(email);
			return res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, newPassword, resetCode } = req.body;
			const user = await userService.resetPassword(
				email,
				newPassword,
				resetCode
			);

			return res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id, name } = req.body;
			const user = await userService.updateUser(id, name);
			return res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			await userService.deleteUser(id);
			res.status(200).json({ message: "Пользователь успешно удалён" });
		} catch (error) {
			next(error);
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			if (process.env.CLIENT_URL) {
				return res.redirect(process.env.CLIENT_URL);
			}
		} catch (error) {
			next(error);
		}
	}

	async refreshToken(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie("refreshToken", userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
