import { TUser } from '@arseniy/types'
import { SerializedError, createSlice } from '@reduxjs/toolkit'
import { getUser, loginUser, register, updateUser } from './actions'

interface UserState {
  isAuthChecked: boolean
  isAuthenticated: boolean
  user: TUser | null
  error: SerializedError | null
  loginUserRequest: boolean
  loading: boolean
} 

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,  
  error: null,
  loginUserRequest: false,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true
    },
    userLogout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
        state.loginUserRequest = false
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.loginUserRequest = false
        state.error = action.error
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export default userSlice.reducer
