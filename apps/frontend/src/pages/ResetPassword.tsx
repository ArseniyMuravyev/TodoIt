import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const ResetPassword: FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState<Error | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setError(null)
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword')
        navigate('/login')
      })
      .catch((err) => setError(err))
  }

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true })
    }
  }, [navigate])

  return (
    <Box bg="white" p={6} rounded="md" boxShadow="lg">
      <VStack spacing={6}>
        <Heading size="lg">Восстановление пароля</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={Boolean(errorText)}>
              <PasswordInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errorText)}>
              <Input
                type="text"
                placeholder="Введите код из письма"
                onChange={(e) => setToken(e.target.value)}
                value={token}
                name="token"
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Сохранить
            </Button>
          </VStack>
        </form>
        <Text>
          Вспомнили пароль?
          <ChakraLink as={Link} to="/login" pl={2} color="blue.500">
            Войти
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  )
}
