import { Document, Schema, model } from 'mongoose'

interface Todo extends Document {
  id: string;
  todo: string;
  completed: boolean;
}

const todoSchema = new Schema<Todo>({
  id: { type: String, required: true },
  todo: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

export default model<Todo>('Todo', todoSchema)
