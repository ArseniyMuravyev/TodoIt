import { TUser } from '@arseniy/types'
import bcrypt from 'bcrypt'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: string
}

const accessTokenKey = process.env.ACCESS_TOKEN_SECRET ?? ''
const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET ?? ''

export const router = express.Router()

router.use(cors())
router.use(express.json({ limit: '10mb' }))

router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким email уже существует' })
    }

    const user = new User({
      email,
      name,
      password: hashedPassword,
    })
    await user.save()

    const accessToken = jwt.sign({ userId: user._id }, accessTokenKey, {
      expiresIn: '15m',
    })

    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenKey, {
      expiresIn: '7d',
    })

    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ошибка при создании пользователя' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    const accessToken = jwt.sign({ userId: user._id }, accessTokenKey, {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenKey, {
      expiresIn: '7d',
    })

    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ошибка на сервере при попытке входа' })
  }
})

router.get('/user', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Не авторизован' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, accessTokenKey) as JwtPayloadWithUserId

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    return res.json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const userToSend = await User.findById(updatedUser._id).select('-password')

    res.json({
      success: true,
      user: userToSend,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Ошибка сервера: ${error}` })
  }
})

router.post('/logout', async (_, res) => {
  res.status(200).json({ message: 'Вы успешно вышли из системы.' })
})

router.get('/', async (_, res) => {
  try {
    const users: TUser[] = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
  }
})
