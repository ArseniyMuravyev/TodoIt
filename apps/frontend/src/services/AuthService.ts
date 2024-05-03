import { AxiosResponse } from "axios";
import { TRegisterData } from "../features/user/actions";
import { AuthResponse } from "../models/response/AuthResponse";
import { api } from "../utils/api";

export class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return await api.post<AuthResponse>("auth/login", {
			email,
			password,
		});
	}

	static async register(
		registerData: TRegisterData
	): Promise<AxiosResponse<AuthResponse>> {
		return await api.post<AuthResponse>("auth/register", registerData);
	}

	static async logout(): Promise<AxiosResponse<AuthResponse>> {
		return await api.post<AuthResponse>("auth/logout");
	}

	static async forgotPassword(
		email: string
	): Promise<AxiosResponse<AuthResponse>> {
		return await api.post<AuthResponse>("auth/forgot-password", { email });
	}

	static async resetPassword(
		email: string,
		resetCode: string,
		newPassword: string
	): Promise<AxiosResponse<AuthResponse>> {
		return await api.post<AuthResponse>("auth/reset-password", {
			email,
			resetCode,
			newPassword,
		});
	}

	static async updateUser(
		id: string,
		name: string
	): Promise<AxiosResponse<AuthResponse>> {
		return await api.put<AuthResponse>(`auth/user/${id}`, { id, name });
	}

	static async deleteUser(id: string): Promise<AxiosResponse<AuthResponse>> {
		return await api.delete(`auth/user/${id}`);
	}
}
