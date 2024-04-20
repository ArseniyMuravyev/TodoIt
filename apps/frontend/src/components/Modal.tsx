import {
  Modal as BaseModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IModal {
  children: ReactNode
  title?: string
}

export const Modal: FC<IModal> = ({ children, title }) => {
  const navigate = useNavigate()

  const onClose = () => {
    navigate(-1)
  }

  return (
    <BaseModal isCentered isOpen={true} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent minH="200" width='100%'>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </BaseModal>
  )
}
