import { useEffect, useState } from 'react'

import {
  Container,
  CardContainer,
  DivCenter,
  DivButton,
  DivText,
  DivTop,
} from './styled'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { LogoutService } from '../../services/Auth/logout'
import useColabContext, { IColabContext, keyLocalStorage } from '../../context_api'
import { clearLocalStorageSecret, setLocalStorageSecret } from '../../context_api/utils'
import { Company } from '../../utils/companyRegister'
import { ROUTES } from '../../routes/constants'
import { toast } from 'react-toastify'
export function ToastSessionNotify(props: any) {

  const { colabProvider, setData } = useColabContext()
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {}, [])

  const handleLogout = () => {

    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await LogoutService()
        if(response) {

          if (response.response.statusCode === 200) {
            const { auth, ...rest } = colabProvider
            const updatedColabProvider: IColabContext = {
              auth: {
                ...auth,
                isLogged: false,
              },
              ...rest,
            }
            setData({ ...updatedColabProvider })
            clearLocalStorageSecret()
            setLocalStorageSecret(
            keyLocalStorage,
            JSON.stringify({
              auth: {
                isLogged: false,
                accessToken: '',
                refreshToken: '',
                sub: '',
                profile: '',
                roles: [],
              },
              user: {
                id: 0,
                name: '',
                funcao: '',
              },
              notifications: {
                isActive: false,
              },
              system: {
                company: Company.company,
                software: Company.software,
                version: Company.version,
                build: Company.build,
                licenseType: Company.licenseType,
                moreInfo: Company.moreInfo,
              },
              menu: {
                sidebarIsActive: true,
              },
            }),
            )
            navigate(ROUTES.Login)
          } else {
            throw new Error(response.response.message)
          }
        }
        } catch (error) {
        toast.error(String(error))
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <Container>
      <CardContainer>
        <DivCenter>
          <DivTop>SESSÃO EXPIRADA!</DivTop>
          <DivText>
            Tua sessão expirou, precisa fazer o login novamente!
          </DivText>
          <DivButton>
            <Button
              type="button"
              as={'a'}
              colorScheme="yellow"
              onClick={handleLogout}
              size={'xs'}
              color={'#fff'}
              width={'100%'}
              isLoading={isLoading}
              loadingText={'Aguarde...'}
            >
              OK
            </Button>
          </DivButton>
        </DivCenter>
      </CardContainer>
    </Container>
  )
}
