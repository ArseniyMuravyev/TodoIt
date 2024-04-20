import { Schema, model } from 'mongoose'

const todoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
  date: { type: Date },
})

export const Todo = model('Todo', todoSchema)
