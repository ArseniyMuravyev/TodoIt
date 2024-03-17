import { Router } from 'express';
import TodoModel from '../models/todo';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export { router as todoRoutes };
