import { ValidationError } from "express-validator";
import { HTTP_STATUS } from "../utils/constants";

type ErrorDetails = ValidationError[];

export class ApiError extends Error {
	status: number;
	errors: ErrorDetails;

	constructor(status: number, message: string, errors: ErrorDetails = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnauthorizedError(): ApiError {
		return new ApiError(
			HTTP_STATUS.UNAUTHORIZED,
			"Пользователь не авторизован"
		);
	}

	static BadRequestError(message: string, errors: ErrorDetails = []): ApiError {
		return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
	}

	static NotFoundError(): ApiError {
		return new ApiError(HTTP_STATUS.NOT_FOUND, "Страница не найдена");
	}
}
