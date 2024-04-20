import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import { AuthButton } from './AuthButton'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'

export const Header: FC = () => {
  return (
    <Box as="header" maxH="160">
      <Flex justifyContent="space-between" alignItems="center">
        <Logo />
        <RouterLink
          to="/"
          style={({ isActive }) =>
            isActive ? { color: '#848484', textDecoration: 'underline' } : {}
          }
        >
          Home
        </RouterLink>
        <RouterLink
          to="/todos"
          style={({ isActive }) =>
            isActive ? { color: '#848484', textDecoration: 'underline' } : {}
          }
        >
          My todos
        </RouterLink>
        <Flex gap="8" justifyContent="center" alignItems="center">
          <AuthButton />
          <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Box>
  )
}
