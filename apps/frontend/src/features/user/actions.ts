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

type TResetPasswordData = {
	email: string;
	resetCode: string;
	newPassword: string;
};

export const register = createAsyncThunk(
	"auth/register",
	async (registerData: TRegisterData, { rejectWithValue }) => {
		try {
			const response = await AuthService.register(registerData);
			localStorage.setItem("accessToken", response.data.accessToken);
			return response.data.user;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const login = createAsyncThunk(
	"user/loginUser",
	async (
		{ email, password }: Omit<TRegisterData, "name">,
		{ rejectWithValue }
	) => {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem("accessToken", response.data.accessToken);

			return response.data.user;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const logout = createAsyncThunk(
	"user/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			await AuthService.logout();
			localStorage.removeItem("accessToken");
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async (id: string, { rejectWithValue }) => {
		try {
			await AuthService.deleteUser(id);
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const checkAuth = createAsyncThunk(
	"user/checkUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<AuthResponse>(
				"http://localhost:5000/auth/refresh",
				{ withCredentials: true }
			);
			localStorage.setItem("accessToken", response.data.accessToken);
			return response.data.user;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async (updateData: Omit<TUser, "email">, { rejectWithValue }) => {
		try {
			const { id, name } = updateData;
			const accessToken = localStorage.getItem("accessToken");

			if (!accessToken) {
				return rejectWithValue("Токен доступа отсутствует.");
			}
			const response = await AuthService.updateUser(id, name);

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	"auth/forgotPassword",
	async ({ email }: { email: string }, { rejectWithValue }) => {
		try {
			const response = await AuthService.forgotPassword(email);

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	async (
		{ email, resetCode, newPassword }: TResetPasswordData,
		{ rejectWithValue }
	) => {
		try {
			const response = await AuthService.resetPassword(
				email,
				resetCode,
				newPassword
			);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message);
		}
	}
);
