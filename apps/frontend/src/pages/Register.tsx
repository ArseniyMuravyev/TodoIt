import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FC, SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from '../services/store'
import { register } from '../services/user/actions'

export const Register: FC = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(
      register({
        name: userName,
        email: email,
        password: password,
      })
    )
  }

  return (
    <Flex justifyContent="center" alignContent="center" p={6}>
      <VStack spacing={6} width="100%">
        <Heading as="h3" paddingBottom={6}>
          Регистрация
        </Heading>
        <form name="register" onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={6}>
            <FormControl id="name">
              <FormLabel>Имя</FormLabel>
              <Input
                type="text"
                placeholder="Введите ваше имя"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Введите ваш email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                placeholder="Введите ваш пароль"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <Button colorScheme="blue" width="full" type="submit">
              Зарегистрироваться
            </Button>
          </VStack>
        </form>
        <Flex pt={6} gap={2}>
          Уже зарегистрированы?
          <Link to="/login">
            <Text color="blue.500">Войти</Text>
          </Link>
        </Flex>
      </VStack>
    </Flex>
  )
}
