import { ITodo } from '@arseniy/types'
import { Flex, ListItem, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CompleteButton } from './CompleteButton'
import { DeleteButton } from './DeleteButton'
import { EditButton } from './EditButton'

interface ITodoCard {
  todo: ITodo
}

export const TodoCard: FC<ITodoCard> = ({ todo }) => {
  const location = useLocation()
  return (
    <ListItem
      w="100%"
      isTruncated
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
      }}
    >
      <Flex alignItems="center" gap="2" mb="2">
        <Link
          to={`/todos/${todo._id}`}
          state={{ backgroundLocation: location }}
        >
          <Text fontSize="xl" >{todo.title}</Text>
        </Link>
        {todo.date && (
          <Text fontSize="sm" color="gray.500">
            {new Date(todo.date).toLocaleDateString()}
          </Text>
        )}
        <Flex gap="2">
          <CompleteButton todo={todo} />
          <EditButton todo={todo} />
          <DeleteButton todo={todo} />
        </Flex>
      </Flex>
    </ListItem>
  )
}
