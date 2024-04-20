import { FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AddTodo } from '../components/AddTodo'
import { TodoList } from '../components/TodoList'
import { useDispatch } from '../services/store'
import { fetchTodos } from '../services/todo/actions'

export const Todos: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation

  return (
    <>
      <TodoList />
      <AddTodo />
      {backgroundLocation && <Outlet />}
    </>
  )
}
