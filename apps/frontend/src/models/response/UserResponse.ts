import { TUser } from "@arseniy/types";

export interface UserResponse {
	accessToken: string;
	refreshToken: string;
	name: string;
	user: TUser;
	avatarName?: string;
}
