import { AxiosResponse } from "axios";
import { UserResponse } from "../models/response/UserResponse";
import { api } from "../utils/api";

export class UserService {
	static async updateUser(
		id: string,
		name: string
	): Promise<AxiosResponse<UserResponse>> {
		return await api.put(`user/${id}`, { name });
	}

	static async uploadAvatar(
		id: string,
		formData: FormData
	): Promise<AxiosResponse<UserResponse>> {
		return await api.post(`user/${id}/avatar`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	}

	static async deleteAvatar(id: string) {
		return await api.delete(`user/${id}/avatar`);
	}

	static async deleteUser(id: string) {
		return await api.delete(`user/${id}`);
	}
}
