import jwt from "jsonwebtoken";
import { accessSecret, refreshSecret } from "../main";
import { TokenModel } from "../models/token-model";

class TokenService {
	generateToken(payload: object, key: string, expiresIn: string) {
		return jwt.sign(payload, key, { expiresIn });
	}

	generateTokens(payload: object) {
		const accessToken = this.generateToken(payload, accessSecret, "15m");
		const refreshToken = this.generateToken(payload, refreshSecret, "7d");

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await TokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = TokenModel.create({ userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken: string) {
		const tokenData = await TokenModel.deleteOne({ refreshToken });
		return tokenData;
	}

	async findToken(refreshToken: string) {
		const tokenData = await TokenModel.findOne({ refreshToken });
		return tokenData;
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, accessSecret);
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, refreshSecret);
			return userData;
		} catch (error) {
			return null;
		}
	}
}

export const tokenService = new TokenService();
