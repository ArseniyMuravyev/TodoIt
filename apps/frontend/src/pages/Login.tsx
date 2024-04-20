import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { FC, SyntheticEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../services/store'
import { loginUser } from '../services/user/actions'

export const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const toast = useToast()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: 'Ошибка.',
        description: 'Email и пароль не должны быть пустыми.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    dispatch(loginUser({ email, password }))
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <Flex justifyContent="center" align="center" p={6}>
      <VStack spacing={6} width="100%">
        <Heading as="h1" paddingBottom={6}>
          Вход
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              w="50vw"
            />
            <Input
              type="password"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              w="50vw"
            />
            <Button colorScheme="blue" width="full" type="submit">
              Войти
            </Button>
          </VStack>
        </form>
        <Flex
          pt={6}
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexDirection="column"
        >
          <Flex gap={2}>
            <Text>Вы - новый пользователь?</Text>
            <Link to="/register">
              <Text color="blue.500">Зарегистрироваться</Text>
            </Link>
          </Flex>
          <Flex gap={2}>
            <Text>Забыли пароль?</Text>
            <Link to="/forgot-password">
              <Text color="blue.500">Восстановить пароль</Text>
            </Link>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  )
}
