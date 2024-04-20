import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../services/store'
import { getUser, logoutUser, updateUser } from '../services/user/actions'

export const Profile: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const toast = useToast()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  })

  useEffect(() => {
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    })
  }, [user])

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (!user?._id) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось определить идентификатор пользователя.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const userDataToUpdate = {
      ...formValue,
      _id: user._id,
    }

    dispatch(updateUser(userDataToUpdate))
      .unwrap()
      .then((updatedUser) => {
        setFormValue({
          name: updatedUser.name,
          email: updatedUser.email,
          password: '',
        })
        toast({
          title: 'Успех',
          description: 'Профиль пользователя успешно обновлен.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: 'Ошибка',
          description:
            error.message || 'Произошла ошибка при обновлении профиля.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    toast({
      title: 'Выход выполнен',
      description: 'Вы успешно вышли из системы.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Box>
      <VStack as="form" spacing={4} onSubmit={handleSubmit} mt="30px">
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleInputChange}
          value={formValue.name}
          name="name"
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleInputChange}
          value={formValue.email}
          name="email"
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={handleInputChange}
          value={formValue.password}
          name="password"
        />
        {isFormChanged && (
          <Box>
            <Button variant="outline" onClick={handleCancel} mr={3}>
              Отменить
            </Button>
            <Button variant="solid" type="submit">
              Сохранить
            </Button>
          </Box>
        )}
        <Button variant="link" colorScheme="blue" onClick={handleLogout}>
          Выход
        </Button>
      </VStack>
    </Box>
  )
}
