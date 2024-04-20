import { Flex, Heading, Text } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

type ErrorResponse = {
  data: unknown
  status: number
  statusText: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100vh"
      gap="12"
    >
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text color="gray.600" as="i">
        {error.statusText}
      </Text>
    </Flex>
  )
}
