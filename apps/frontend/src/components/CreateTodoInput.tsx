import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { CirclePlus } from 'lucide-react'
import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch } from '../services/store'
import { createTodo } from '../services/todo/actions'
import { DatePicker } from './DatePicker'

interface ICreateTodoInput {
  setIsInputVisible: Dispatch<SetStateAction<boolean>>
  setIsAddTodoVisible: Dispatch<SetStateAction<boolean>>
}

export const CreateTodoInput: FC<ICreateTodoInput> = ({
  setIsInputVisible,
  setIsAddTodoVisible,
}) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()

    if (trimmedInput) {
      dispatch(createTodo({ title: trimmedInput, date: date }))
      setInput('')
      setDate(new Date())
      setIsInputVisible(false)
      setIsAddTodoVisible(true)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsInputVisible(false)
      setIsAddTodoVisible(true)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Box mt="4">
      <form onSubmit={handleSubmit}>
        <Flex gap="4" h="10">
          <Input
            type="text"
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your todo!"
            onKeyDown={handleKeyDown}
            maxW="160"
            h="100%"
          />
          <DatePicker date={date} setDate={setDate} />
          <Button type="submit" h="100%" bg="none">
            <CirclePlus size="20" />
          </Button>
        </Flex>
      </form>
    </Box>
  )
}
