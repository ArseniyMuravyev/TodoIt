import { Button } from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from '../services/store'

interface IAuthButton {}

export const AuthButton: FC<IAuthButton> = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <Button>
      <NavLink to={user ? 'profile' : 'register'}>
        {user ? 'Profile' : 'Sign Up'}
      </NavLink>
    </Button>
  )
}
