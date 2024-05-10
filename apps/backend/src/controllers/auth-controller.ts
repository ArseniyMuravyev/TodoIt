import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import { authService } from "../services/auth-service";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			const userData = await authService.login(email, password);

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
			const userData = await authService.registration(name, email, password);
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
			const token = await authService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (error) {
			next(error);
		}
	}

	async forgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const user = await authService.forgotPassword(email);
			return res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, newPassword, resetCode } = req.body;
			const user = await authService.resetPassword(
				email,
				newPassword,
				resetCode
			);

			return res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link;
			await authService.activate(activationLink);
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
			const userData = await authService.refresh(refreshToken);
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

export const authController = new AuthController();
