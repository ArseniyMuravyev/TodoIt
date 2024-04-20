import { ITodo } from '@arseniy/types'
import { Check } from 'lucide-react'
import { FC } from 'react'
import { useDispatch } from '../services/store'
import { completeTodo } from '../services/todo/actions'

interface ICompleteButton {
  todo: ITodo
}

export const CompleteButton: FC<ICompleteButton> = ({ todo }) => {
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(completeTodo(todo))}>
      <Check size="20" color="#9cb499" />
    </button>
  )
}
