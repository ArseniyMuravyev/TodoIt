import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { userService } from "../services/user-service";

class UserController {
	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const name = req.body.name;

			const updatedUser = await userService.updateUser(id, name);

			res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	}

	async uploadAvatar(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const file = req.files?.file as UploadedFile;

			if (file) {
				const updatedUser = await userService.uploadAvatar(id, file);
				res.json(updatedUser);
			}
		} catch (error) {
			next(error);
		}
	}

	async deleteAvatar(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			await userService.deleteAvatar(id);
			res.status(200).json({ message: "Аватар успешно удалён" });
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
}

export const userController = new UserController();
