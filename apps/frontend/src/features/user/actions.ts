import { TUser } from "@arseniy/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import { AuthService } from "../../services/AuthService";

export type TRegisterData = {
	email: string;
	name: string;
	password: string;
};

export type TResetPasswordData = {
	email: string;
	resetCode: string;
	newPassword: string;
};

export const register = createAsyncThunk(
	"auth/register",
	async (registerData: TRegisterData) => {
		const response = await AuthService.register(registerData);
		localStorage.setItem("accessToken", response.data.accessToken);
		return response.data.user;
	}
);

export const login = createAsyncThunk(
	"user/loginUser",
	async ({ email, password }: Omit<TRegisterData, "name">) => {
		const response = await AuthService.login(email, password);
		localStorage.setItem("accessToken", response.data.accessToken);

		return response.data.user;
	}
);

export const logout = createAsyncThunk("user/logoutUser", async (_) => {
	await AuthService.logout();
	localStorage.removeItem("accessToken");
});

export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async (id: string) => {
		await AuthService.deleteUser(id);
	}
);

export const checkAuth = createAsyncThunk("user/checkUser", async (_) => {
	const response = await axios.get<AuthResponse>(
		"http://localhost:5000/auth/refresh",
		{ withCredentials: true }
	);
	localStorage.setItem("accessToken", response.data.accessToken);
	return response.data.user;
});

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async (updateData: Omit<TUser, "email">) => {
		const { id, name } = updateData;
		const response = await AuthService.updateUser(id, name);

		return response.data;
	}
);

export const forgotPassword = createAsyncThunk(
	"auth/forgotPassword",
	async ({ email }: { email: string }) => {
		const response = await AuthService.forgotPassword(email);

		return response.data;
	}
);

export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	async ({ email, resetCode, newPassword }: TResetPasswordData) => {
		const response = await AuthService.resetPassword(
			email,
			resetCode,
			newPassword
		);
		return response.data;
	}
);
