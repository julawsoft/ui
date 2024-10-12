import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/theme'
import { Loader } from './components/Loader'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from './routes/Router'
import { ColabProvider } from './context_api'
import { ToastNotification } from './components/ToastNotification'
import useSolicitation from './hooks/useSolicitation'

useSolicitation.subscribe((state) => console.log('new state: ... ', state))

function App() {
  return (
    <ColabProvider>
      <ChakraProvider theme={defaultTheme}>
        <ToastNotification />
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Router />
          </Suspense>
        </BrowserRouter>
      </ChakraProvider>
    </ColabProvider>
  )
}

export default App
