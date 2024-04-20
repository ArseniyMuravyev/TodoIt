import { ITodo } from '@arseniy/types'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { useDispatch } from '../services/store'
import { removeTodo } from '../services/todo/actions'

interface IDeleteButton {
  todo: ITodo
}

export const DeleteButton: FC<IDeleteButton> = ({ todo }) => {
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(removeTodo(todo._id))}>
      <Trash2 size={20} color="#e04c42" />
    </button>
  )
}
