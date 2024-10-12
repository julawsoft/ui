import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Text, Flex, Box } from '@chakra-ui/react'

import { Loader } from '../../../components/Loader'
import { IInit, InitService } from '../../../services/Setup/init'
import { toast } from 'react-toastify'
import { ROUTES } from '../../../routes/constants'
import { XCircle } from 'phosphor-react'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { redirect } from '../../../utils/http/redirect'
import { set } from 'zod'

export function Init() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [data, setData] = useState<IInit>()

  useEffect(() => {
    async function init() {
      token ? await checkTokenCode(token) : toast.error('Invalid token')
    }
    init()
  }, [])

  const checkTokenCode = async (code: string) => {
    setTimeout(async () => {
      try {
        const response = await InitService(code)
        console.log(response)
        if(response) {

          if (response.response.statusCode === 200) {
            setData(response.data)
            if (data?.is_activated) {
              redirect(`${ROUTES.Login}/${token}}`, 'A tua já foi activada... Faça o login...', navigate, data)
            } else {
              // redirect(ROUTES.SETUP, 'Token válido... Redirecting...')
              setTimeout(() => {
                navigate(`${ROUTES.SETUP}/${token}`, {
                  state: { ...response.data },
                })
              }, 1000)
            }
            // redirect('acambinza@cetim.ms', 'Cetim Tecnologias S.A')
          } else {
            console.log('here...,')
            setIsError(true)
            setMessage(response.response.message)
            setIsLoading(false)
          }
        }else{
          setMessage("Token expirado/inválido!")
        }
        } catch (e) {
          console.log('sadss')
          setIsLoading(false)
        setIsError(true)
        setMessage(String(e))
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <Box  bgColor={'#26282a'} color={'#d1d2dc'} fontFamily={'Roboto'}>
      {isLoading && !isError ? (
        <Flex justifyContent={'center'} alignItems={'center'} width={'100vw'} height={'100vh'} flexDirection={'column'}>
          <SpinnerProgress />
          <Text>Carregando...</Text>
        </Flex>
      ) : (
        <Flex
          bgColor={'#26282a'} color={'#d1d2dc'} fontFamily={'Roboto'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100vh'}
          width={'100vw'}
        >
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={4}
            width={'90%'}
            textAlign={'center'}
          >
            <Text fontSize={'1.2rem'}>{message}</Text>
            {message ? <XCircle size={"10rem"} color="#86140d" /> : null}
          </Flex>
        </Flex>
      )}
    </Box>
  )
}
