import { Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";

export const errorMiddleware = (
	error: unknown,
	req: Request,
	res: Response
) => {
	console.error(error);

	if (error instanceof ApiError) {
		return res
			.status(error.status)
			.json({ message: error.message, errors: error.errors });
	} else if (error instanceof Error) {
		return res.status(500).json({ message: error.message });
	} else {
		return res.status(500).json({ message: "An unexpected error occurred" });
	}
};
