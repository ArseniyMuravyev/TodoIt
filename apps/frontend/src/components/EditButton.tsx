import { ITodo } from '@arseniy/types'
import { Input } from '@chakra-ui/react'
import { Pencil } from 'lucide-react'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { useDispatch } from '../services/store'
import { updateTodo } from '../services/todo/actions'

interface IEditButtonProps {
  todo: ITodo
}

export const EditButton: FC<IEditButtonProps> = ({ todo }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(todo.title)
  const dispatch = useDispatch()

  const handleEditStart = () => {
    setEditMode(true)
  }

  const handleEditEnd = () => {
    if (newTitle !== todo.title) {
      dispatch(updateTodo({ _id: todo._id, newTitle }))
    }
    setEditMode(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditEnd()
    }
  }

  return (
    <>
      {editMode ? (
        <Input
          value={newTitle}
          autoFocus
          onBlur={handleEditEnd}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          size="sm"
        />
      ) : (
        <button onClick={handleEditStart}>
          <Pencil size="20" color="#cbd8f5" />
        </button>
      )}
    </>
  )
}
