import { ITodo } from '@arseniy/types'
import { SerializedError, createSlice } from '@reduxjs/toolkit'
import {
  completeTodo,
  createTodo,
  fetchTodos,
  getTodoById,
  removeTodo,
  updateTodo,
} from './actions'

interface InitialState {
  loading: boolean
  error: SerializedError | null
  todos: ITodo[]
}

const initialState: InitialState = {
  loading: false,
  error: null,
  todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload)
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.loading = true
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id
            ? { ...todo, ...action.payload }
            : todo
        )
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload]
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(createTodo.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getTodoById.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id
            ? { ...todo, ...action.payload }
            : todo
        )
      })
      .addCase(getTodoById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(getTodoById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id
            ? { ...todo, ...action.payload }
            : todo
        )
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.loading = true
      })
  },
})

export default todoSlice.reducer
