import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err);

	return res
		.status(err.status)
		.json({ message: err.message, errors: err.errors });
};
