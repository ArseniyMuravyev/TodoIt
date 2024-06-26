import { TUser } from "@arseniy/types";

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: TUser;
}
