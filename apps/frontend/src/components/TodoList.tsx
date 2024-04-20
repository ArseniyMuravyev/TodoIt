import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useSelector } from '../services/store'
import {
  getTodosForCurrentWeek,
  getTodosForToday,
  sortTodosByDate,
} from '../utils'
import { TodoContainer } from './TodoContainer'

export const TodoList: FC = () => {
  const todos = useSelector((state) => state.todo.todos)
  const sortedTodos = sortTodosByDate(todos)
  const todayTodos = getTodosForToday(todos)
  const weekTodos = getTodosForCurrentWeek(todos)

  const todoList = [
    { title: 'All Todos', todos },
    { title: 'Sorted Todos', todos: sortedTodos },
    { title: 'Todos for Today', todos: todayTodos },
    { title: 'Todos for the week', todos: weekTodos },
  ]

  return (
    <Flex gap="16">
      {todoList.map((list) => (
        <TodoContainer key={list.title} title={list.title} todos={list.todos} />
      ))}
    </Flex>
  )
}
