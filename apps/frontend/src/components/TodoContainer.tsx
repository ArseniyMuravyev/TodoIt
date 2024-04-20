import { ITodo } from '@arseniy/types'
import { Box, Heading, List } from '@chakra-ui/react'
import { FC } from 'react'
import { TodoCard } from './TodoCard'

interface ITodoContainer {
  title: string
  todos: ITodo[]
}

export const TodoContainer: FC<ITodoContainer> = ({ title, todos }) => {
  return (
    <Box mt="12">
      <Heading as="h2" size="md" mb="4">
        {title}
      </Heading>
      <List>
        {todos.map((todo: ITodo) => (
          <TodoCard todo={todo} key={todo._id} />
        ))}
      </List>
    </Box>
  )
}
