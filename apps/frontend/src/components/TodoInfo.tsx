import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from '../services/store'
import { getTodoById } from '../services/todo/actions'
import { formatDate } from '../utils'

export const TodoInfo: FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getTodoById(id))
    }
  }, [dispatch, id])

  const todo = useSelector((state) =>
    state.todo.todos.find((todo) => todo._id === id)
  )

  return (
    <Box px="4" w="100%">
      <Heading as="h3" size="sm">
        {todo?.title}
      </Heading>
      <Flex justifyContent="space-between" mt="14">
        <Text>Status: {todo?.completed ? 'done' : 'not done'}</Text>
        {todo?.date && <Text>{formatDate(todo.date.toString())}</Text>}
      </Flex>
    </Box>
  )
}
