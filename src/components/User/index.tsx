import { useState } from 'react'
import { SignOut } from 'phosphor-react'

import { useNavigate } from 'react-router-dom'

import { HELP_COLAB } from '../../utils/helpColab'
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  Button,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import useColabContext, {
  IColabContext,
  keyLocalStorage,
} from '../../context_api'
import { LogoutService } from '../../services/Auth/logout'
import { ROUTES } from '../../routes/constants'
import { toast } from 'react-toastify'
import {
  clearLocalStorageSecret,
  setLocalStorageSecret,
} from '../../context_api/utils'
import { Company } from '../../utils/companyRegister'

export function UserComponent() {
  const { colabProvider, setData } = useColabContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

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

  const handleProfile = () => {
    navigate(ROUTES.Profile, { state: { id: colabProvider.user.id } })
  }

  return (
    <Menu>
      <MenuButton>
        {
          <Avatar
            size="sm"
            name={colabProvider.user.name ?? 'User not found'}
            src={colabProvider.user.image}
            border={'.6px solid #C2912E'}
          ></Avatar>
        }
      </MenuButton>
      <MenuList m={0} p={0}>
        <Flex
          p={2}
          gap={3}
          alignItems={'center'}
          bgColor={'colab.sidebar'}
          color={'#fff'}
        >
          <Avatar size="md" name={colabProvider.user.name} src={colabProvider.user.image}></Avatar>
          <Flex flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={'medium'}>
              {colabProvider.user.name}
            </Text>
            <Text fontSize={'12px'}>{colabProvider.user.funcao}</Text>
            <Text onClick={handleProfile}>
              <Text
                fontSize={'11px'}
                color={'colab.primary'}
                _hover={{
                  textDecoration: 'underline',
                }}
                cursor={'pointer'}
              >
                Ver perfil
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'column'} bgColor={'#f2f2f2'}>
          <Flex flexDirection={'column'}>
            <Box
              fontWeight={'medium'}
              p={2}
              borderBottom={'.6px solid #c3c3c3'}
              ml={2}
            >
              Ajuda
            </Box>
            <Box bgColor={'white'}>
              <Box _hover={{ bg: 'gray.800', color: '#fff' }}>
                <a
                  href={`mailto: ${HELP_COLAB.support}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Busque ajuda do Suporte Técnico"
                >
                  <Box p={2} ml={2} _hover={{ bg: 'gray.800', color: '#fff' }}>
                    Suporte Técnico
                  </Box>
                </a>
              </Box>
              <Box _hover={{ bg: 'gray.800', color: '#fff' }}>
                <a
                  href={`mailto: ${HELP_COLAB.rh}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Busque ajuda da DTH"
                >
                  <Box p={2} ml={2} _hover={{ bg: 'gray.800', color: '#fff' }}>
                    DTH
                  </Box>
                </a>
              </Box>
              <Box _hover={{ bg: 'gray.800', color: '#fff' }}>
                <a
                  href={`${HELP_COLAB.manual}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Veja o manula de utilizador"
                >
                  <Box p={2} ml={2}>
                    Manual de Utilizador
                  </Box>
                </a>
              </Box>
            </Box>
          </Flex>
          <Flex flexDirection={'column'}>
            <Box
              fontWeight={'medium'}
              p={2}
              borderBottom={'.6px solid #c3c3c3'}
              ml={2}
            >
              Sobre a Plataforma
            </Box>
            <Box bgColor={'white'} p={4}>
              <Box display={'flex'} gap={1}>
                <Text fontWeight={'medium'}>Software: </Text>{' '}
                {colabProvider.system.software}
              </Box>
              <Box display={'flex'} gap={1}>
                <Text fontWeight={'medium'}>Versão: </Text>{' '}
                {colabProvider.system.version}
              </Box>
              <Box display={'flex'} gap={1}>
                <Text fontWeight={'medium'}>Build: </Text>{' '}
                {colabProvider.system.build}
              </Box>
              <Box display={'flex'} gap={1}>
                <Text fontWeight={'medium'}>Licenciado para: </Text>{' '}
                {colabProvider.system.company}
              </Box>
              <Box display={'flex'} gap={1}>
                <Text fontWeight={'medium'}>Tipo de Licença: </Text>{' '}
                {colabProvider.system.licenseType}
              </Box>
              <Box display={'flex'} gap={1}>
                <Text fontWeight={'medium'}>+Info: </Text>
                <Box
                  target="_blank"
                  style={{ color: '#c2912e', cursor: 'pointer' }}
                  as={'a'}
                  href={colabProvider.system.moreInfo}
                >
                  Lading Page
                </Box>
              </Box>
            </Box>
          </Flex>
          <Flex p={4} bgColor={'white'} borderTop={'.6px solid #c3c3c3'}>
            <Button
              type="button"
              as={'a'}
              colorScheme="#fff"
              onClick={handleLogout}
              size={'sm'}
              color={'#E53838'}
              width={'100%'}
              isLoading={isLoading}
              loadingText={'Aguarde, Encerrando...'}
              borderRadius={0}
              gap={3}
              bgColor={'#fff'}
              cursor={'pointer'}
              _hover={{
                textDecoration: 'underline',
              }}
              title="Deseja sair da Plataforma?"
            >
              <SignOut size={24} />
              Sair da Plataforma
            </Button>
          </Flex>
        </Flex>
      </MenuList>
    </Menu>
  )
}
