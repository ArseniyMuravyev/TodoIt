import { NextFunction, Request, Response } from "express";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import { UserModel } from "../models/user-model";
import { tokenService } from "../services/token-service";
import { TUser } from "@arseniy/types";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authHeader.split(" ")[1];

		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken(accessToken) as TUser;

		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		const user = await UserModel.findById(userData.id);

		if (!user) {
			return next(ApiError.UnauthorizedError());
		}

		const userDto = new UserDto(user);

		req.user = userDto;
		next();
	} catch (error) {
		return next(ApiError.UnauthorizedError());
	}
};
