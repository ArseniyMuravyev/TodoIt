import { Schema, model, Document } from "mongoose";

export interface ITodoSchema extends Document {
	title: string;
	completed: boolean;
	date: Date;
	userId: Schema.Types.ObjectId;
}

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

export const TodoModel = model<ITodoSchema>("Todo", TodoSchema);
