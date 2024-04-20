import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useDispatch } from './services/store'
import { checkUserAuth } from './services/user/actions'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [])

  return (
    <Box minH="100vh" px="24">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}
