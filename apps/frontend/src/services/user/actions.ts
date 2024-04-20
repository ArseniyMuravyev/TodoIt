import { TUser } from '@arseniy/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../utils/api'
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies'
import { userSlice } from './slice'

type TRegisterData = {
  email: string
  name: string
  password: string
}

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: TRegisterData) => {
    const response = await api.post('/auth/register', registerData)
    return response.data
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { getState, rejectWithValue }) => {
    const accessToken = getCookie('accessToken')

    if (!accessToken) {
      return rejectWithValue('Токен доступа отсутствует.')
    }

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    }

    const response = await api.get('/auth/user', config)

    if (response.status === 200) {
      return response.data
    } else {
      return rejectWithValue(
        'Произошла ошибка при получении данных пользователя.'
      )
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: Omit<TRegisterData, 'name'>,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/auth/login', { email, password })

      if (response.status === 200) {
        setCookie('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)

        return response.data.user
      } else {
        return rejectWithValue(
          'Что-то пошло не так при попытке входа пользователя.'
        )
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue('Неизвестная ошибка.')
      }
    }
  }
)

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    const authChecked = userSlice.actions.authChecked
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked())
      })
    } else {
      dispatch(authChecked())
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      await api.post('/auth/logout')
      localStorage.removeItem('refreshToken')
      deleteCookie('accessToken')
      dispatch(userSlice.actions.userLogout())
    } catch (error) {
      console.error('Ошибка выхода', error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData: TUser, { getState, dispatch, rejectWithValue }) => {
    const { _id, ...dataToUpdate } = updateData
    const accessToken = getCookie('accessToken')

    if (!accessToken) {
      return rejectWithValue('Токен доступа отсутствует.')
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
      const response = await api.put(`/auth/user/${_id}`, dataToUpdate, config)

      if (response.status === 200) {
        return response.data
      } else {
        return rejectWithValue('Ошибка при обновлении пользователя.')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(
          'Неизвестная ошибка при обновлении пользователя.'
        )
      }
    }
  }
)
