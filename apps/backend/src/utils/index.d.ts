import { User as UserType } from "../models/user-model";

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		export interface Request {
			user?: UserType;
		}
	}
}
