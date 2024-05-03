import { TUser } from "@arseniy/types";

export interface AuthResponse {
	name: string;
	accessToken: string;
	refreshToken: string;
	user: TUser;
}
