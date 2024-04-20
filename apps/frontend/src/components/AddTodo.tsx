import { Flex } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { FC, useState } from 'react'
import { CreateTodoInput } from './CreateTodoInput'

export const AddTodo: FC = () => {
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(true)
  const [isInputVisible, setIsInputVisible] = useState(false)

  const handleClick = () => {
    setIsInputVisible((prev) => !prev)
    setIsAddTodoVisible((prev) => !prev)
  }

  return (
    <>
      {isAddTodoVisible && (
        <button onClick={handleClick}>
          <Flex gap="2" alignItems="center">
            <Plus size="20" color="#f4bab7" />
            <span>Add task</span>
          </Flex>
        </button>
      )}
      {isInputVisible && (
        <CreateTodoInput
          setIsInputVisible={setIsInputVisible}
          setIsAddTodoVisible={setIsAddTodoVisible}
        />
      )}
    </>
  )
}
