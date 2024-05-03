import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
	title: { type: String, required: true },
	completed: { type: Boolean, required: true },
	date: { type: Date },
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const TodoModel = model("Todo", TodoSchema);
