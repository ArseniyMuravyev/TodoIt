import { ITodo } from '@arseniy/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = import.meta.env.API_URL ?? 'http://localhost:5000/todos'

interface UpdateTodoArgs {
  _id: string
  newTitle: string
}

interface CreateTodoArgs {
  title: string
  date: Date | null
}


export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await axios.get(`${URL}`)
  return response.data
})

export const removeTodo = createAsyncThunk(
  'todo/removeTodo',
  async (_id: string) => {
    await axios.delete(`${URL}/${_id}`)
    return _id
  }
)

export const completeTodo = createAsyncThunk(
  'todo/completeTodo',
  async (todo: ITodo) => {
    const updatedTodo = { ...todo, completed: !todo.completed }
    const response = await axios.put(`${URL}/${todo._id}`, updatedTodo)
    return response.data
  }
)

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async ({ title, date }: CreateTodoArgs) => {
    const response = await axios.post(`${URL}`, { title, date })
    return response.data
  }
)

export const getTodoById = createAsyncThunk(
  'todo/getTodoById',
  async (_id: string) => {
    const response = await axios.get(`${URL}/${_id}`)
    return response.data
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ _id, newTitle }: UpdateTodoArgs) => {
    const response = await axios.put(`${URL}/${_id}`, {
      title: newTitle,
    })
    return response.data
  }
)
