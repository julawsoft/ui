import { useEffect, useState } from 'react'
import { Envelope, LockSimple, SignIn } from 'phosphor-react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import useColabContext from '../../context_api'
import { ROUTES } from '../../routes/constants'
import { LoginText } from '../../utils/constText'
import { LoginService } from '../../services/Auth/login'
import { toast } from 'react-toastify'
import { IUserLogged } from './utils'
import { pathStaticFilesUserProfile } from '../../utils/pathStaticFiles'

const schema = z.object({
  email: z
    .string({
      required_error: 'Tipo de Solicitação é necessário',
      invalid_type_error: 'Campo obrigatório',
    })
    .email()
    .min(3),
  password: z.string().min(6),
})

export function Login() {
  const { colabProvider, setData } = useColabContext()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (colabProvider.auth.isLogged) {
      return navigate('/')
    }
    return navigate(ROUTES.Login)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onFormSubmit = async ({ email, password }: any) => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await LoginService({ email, password })
        if(response) {
          if (response.response.statusCode === 200) {
            pushUserLogged(response.data)
            toast.success('Bem-Vindo(a) ao COLAB!')
            navigate(ROUTES.Home)
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

  const pushUserLogged = (data: IUserLogged) => {
    const {
      auth: {
        isLogged,
        accessToken,
        refreshToken,
        sub,
        profile,
        roles,
        ...rest0
      },
      user: { id, name, funcao, image, ...rest1 },
      ...rest
    } = colabProvider

    const updatedColabProvider = {
      auth: {
        isLogged: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        sub: data.userInfo.sub,
        profile: data.groups[0].name,
        roles: data.roles ? [...data.roles.map((role) => role.name)] : [],
        ...rest0,
      },
      user: {
        id: data.employee.employee_id,
        name: data.employee.Employee.name,
        funcao: data.employee.Employee.Contract[0]
          ? data.employee.Employee.Contract[0].Role.description
          : 'N/A',
        image: pathStaticFilesUserProfile(data.employee.Employee.photo),
        ...rest1
      },
      ...rest,
    }
    setData({ ...updatedColabProvider, ...rest })
  }

  const handleForgotPassword = async () => navigate(ROUTES.ForgotPassword)

  return (
    <Flex
      width="100vw"
      height="100vh"
      align={'center'}
      justify={'center'}
      bg="gray.900"
    >
      <Flex
        as={'form'}
        onSubmit={handleSubmit(onFormSubmit)}
        maxWidth={480}
        width={'100%'}
        bg={'gray.800'}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Flex
          justify="center"
          align="center"
          flexDir="column"
          mb="16"
          color="gray.100"
          gap={2}
        >
          <Flex align="center" gap={2}>
            <SignIn size={24} color="#F2C112" />
            <Text fontSize="2xl" fontWeight="semibold" fontFamily="Poppins">
              {LoginText.FacaLogin}
            </Text>
          </Flex>
          <Box>
            <Text fontSize={'lg'} color="gray.300" fontWeight={'bold'}>
              {LoginText.CredenciasDeAcesso}
            </Text>
          </Box>
        </Flex>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel
              htmlFor="email"
              color={'gray.300'}
              fontFamily="Poppins"
              fontWeight="medium"
            >
              {LoginText.Email}
            </FormLabel>
            <InputGroup size={'lg'}>
              <InputLeftElement pointerEvents="none">
                <Envelope size={24} color="#9699B0" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                focusBorderColor="yellow.300"
                bgColor="gray.900"
                color="gray.100"
                variant="filled"
                size={'lg'}
                autoComplete={'false'}
                _hover={{
                  bgColor: 'gray.900',
                }}
                {...register('email')}
              />
            </InputGroup>
            {errors.email?.message && (
              <Text color="red">{`${JSON.stringify(
                errors.email.message,
              )}`}</Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel
              htmlFor="password"
              color={'gray.300'}
              fontFamily="Poppins"
              fontWeight="medium"
            >
              {LoginText.Password}
            </FormLabel>
            <InputGroup size={'lg'}>
              <InputLeftElement pointerEvents="none">
                <LockSimple size={24} color="#9699B0" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Digite a tua senha"
                focusBorderColor="yellow.300"
                bgColor="gray.900"
                color="gray.100"
                variant="filled"
                size={'lg'}
                _hover={{
                  bgColor: 'gray.900',
                }}
                {...register('password')}
              />
            </InputGroup>
            {errors.password?.message && (
              <Text color="red">{`${JSON.stringify(
                errors.password.message,
              )}`}</Text>
            )}
          </FormControl>
          <Flex justifyContent={'end'} onClick={handleForgotPassword}>
            <Text
              fontWeight={500}
              cursor={'pointer'}
              fontSize={14}
              color={'#F2C112'}
            >
              {LoginText.ForgotPassword}
            </Text>
          </Flex>
        </Stack>

        <Button
          isLoading={isLoading}
          loadingText="Enviando"
          type="submit"
          size={'lg'}
          mt={6}
          colorScheme="yellow"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
