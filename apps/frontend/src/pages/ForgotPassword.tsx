import { Button, Heading, Input, VStack } from '@chakra-ui/react'
import { FC, SyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<Error | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    setError(null)
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true')
        navigate('/reset-password', { replace: true })
      })
      .catch((err) => setError(err))
  }

  return (
    <VStack align="center" justify="center" h="100vh" p={6} spacing={6}>
      <Heading as="h3" size="lg" paddingBottom={6}>
        Восстановление пароля
      </Heading>
      <form onSubmit={handleSubmit} width="100%">
        <VStack spacing={4}>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            isRequired
          />
          <Button
            colorScheme="blue"
            size="md"
            width="full"
            type="submit"
            isLoading={isSending}
          >
            Восстановить
          </Button>
        </VStack>
      </form>
      <Text>
        Вспомнили пароль?
        <Link to="/login">
          <Text as="span" ml={2} color="blue.500">
            Войти
          </Text>
        </Link>
      </Text>
    </VStack>
  )
}
