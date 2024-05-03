import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(error);

	return res
		.status(error.status)
		.json({ message: error.message, errors: error.errors });
};
