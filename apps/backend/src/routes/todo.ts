import { ITodo } from '@arseniy/types'
import cors from 'cors'
import express from 'express'
import { Todo } from '../models/todo'

export const router = express.Router()

router.use(cors())
router.use(express.json())

router.get('/', async (_, res) => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.json(todos)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id)
    res.json(todo)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      date: req.body.date,
      completed: false,
    })
    await newTodo.save()
    res.json(newTodo)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.json(updatedTodo)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({ message: 'Todo successfully deleted' })
  } catch (error) {
    console.log(error)
  }
})
