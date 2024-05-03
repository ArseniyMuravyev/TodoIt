import { HTTP_STATUS } from "../utils/constants";

export class ApiError extends Error {
	status: number;
	errors: string;

	constructor(status: number, message: string, errors: any = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnauthorizedError() {
		return new ApiError(
			HTTP_STATUS.UNAUTHORIZED,
			"Пользователь не авторизован"
		);
	}

	static BadRequestError(message: string, errors: any = []) {
		return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
	}

	static NotFoundError() {
		return new ApiError(HTTP_STATUS.NOT_FOUND, "Страница не найдена");
	}
}
