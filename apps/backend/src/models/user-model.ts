import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
	resetCodeExpire: {
		type: Number,
		required: false,
	},
});

export const UserModel = mongoose.model("User", UserSchema);
