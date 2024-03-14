import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const HTTP_STATUSES = {
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  NOT_FOUND_404: 404,
};

let todos: Todo[] = [];

app.use(bodyParser.json());

app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

app.get('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));

  if (todo) {
    res.json(todo);
  } else {
    res
      .status(HTTP_STATUSES.NOT_FOUND_404)
      .json({ message: 'Задача не найдена' });
  }
});

app.post('/todos', (req: Request, res: Response) => {
  const { task }: { task: string } = req.body;
  const newTodo: Todo = {
    id: todos.length + 1,
    task: task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(HTTP_STATUSES.CREATED_201).json(newTodo);
});

app.put('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { task, completed }: { task: string; completed: boolean } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));
  if (todoIndex !== -1) {
    todos[todoIndex].task = task || todos[todoIndex].task;
    todos[todoIndex].completed = completed || todos[todoIndex].completed;
    res.json(todos[todoIndex]);
  } else {
    res
      .status(HTTP_STATUSES.NOT_FOUND_404)
      .json({ message: 'Задача не найдена' });
  }
});

app.delete('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== Number(id));
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, host, () => {});
