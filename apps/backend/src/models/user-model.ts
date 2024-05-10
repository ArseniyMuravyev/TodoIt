import { Document, model, Schema } from "mongoose";

export interface IUserSchema extends Document {
	name: string;
	email: string;
	password: string;
	isActivated: boolean;
	activationLink: string;
	resetCode: string;
	_id: string;
	avatarName?: string;
}

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
		match: [/\S+@\S+\.\S+/, "Please, enter valid email"],
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isActivated: {
		type: Boolean,
		default: false,
	},
	activationLink: {
		type: String,
	},
	resetCode: {
		type: String,
		required: false,
		index: true,
	},
	avatarName: {
		type: String,
		required: false,
	},
});

export const UserModel = model<IUserSchema>("User", UserSchema);
