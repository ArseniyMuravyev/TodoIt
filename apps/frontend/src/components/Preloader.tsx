import { Box, keyframes } from '@chakra-ui/react'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Preloader = () => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as="div"
        boxSize="74px"
        border="1px solid"
        borderColor="#d1d2d6 #9fa0a5 #626368 #1a1b22"
        borderRadius="full"
        position="relative"
        margin="auto"
        animation={`${spin} 0.75s infinite linear`}
      />
    </Box>
  )
}
