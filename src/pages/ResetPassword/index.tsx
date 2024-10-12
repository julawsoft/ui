import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useNavigate, useParams } from 'react-router-dom'

import { LockSimple, SignIn } from 'phosphor-react'

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

import { ResetPasswordService } from '../../services/Auth/resetPassword'
import { toast } from 'react-toastify'

const createNewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'A Palavra-passe deve ter no mínimo 6 caracteres'),
  passwordReset: z
    .string()
    .min(6, 'A Palavra-passe deve ter no mínimo 6 caracteres'),
})

type ICreateNewPassword = z.infer<typeof createNewPasswordSchema>

export function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICreateNewPassword>({
    resolver: zodResolver(createNewPasswordSchema),
  })

  const secondPassword = watch('passwordReset')

  const confirmPasswords = (password: string, passwordReset: string) => {
    return password === passwordReset
  }

  async function createNewPassword(data: ICreateNewPassword) {
    if (!confirmPasswords(data.password, secondPassword))
      return toast.error(
        'As palavras-passes não coincidem, verifique por favor!',
      )

    const resetPasswordSchema = {
      password: data.password,
      token,
    }

    try {
      await ResetPasswordService.send(resetPasswordSchema)
      toast.success('Palavra-passe redefinida com sucesso!')

      reset()
      navigate('/login')
    } catch (err: any) {
      reset()
      toast.error(JSON.stringify(err.message))
    }
  }

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
        onSubmit={handleSubmit(createNewPassword)}
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
              Definir nova Senha
            </Text>
          </Flex>
          <Box>
            <Text fontSize={'lg'} color="gray.300" fontWeight={'bold'}>
              Digite a tua nova senha
            </Text>
          </Box>
        </Flex>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel
              htmlFor="password"
              color={'gray.300'}
              fontFamily="Poppins"
              fontWeight="medium"
            >
              Nova Senha
            </FormLabel>
            <InputGroup size={'lg'}>
              <InputLeftElement pointerEvents="none">
                <LockSimple size={24} color="#9699B0" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Digite tua senha"
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

          <FormControl>
            <FormLabel
              htmlFor="password"
              color={'gray.300'}
              fontFamily="Poppins"
              fontWeight="medium"
            >
              Repetir Nova Senha
            </FormLabel>
            <InputGroup size={'lg'}>
              <InputLeftElement pointerEvents="none">
                <LockSimple size={24} color="#9699B0" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Digite a tua Palavra-passe novamente"
                focusBorderColor="yellow.300"
                bgColor="gray.900"
                color="gray.100"
                variant="filled"
                size={'lg'}
                _hover={{
                  bgColor: 'gray.900',
                }}
                {...register('passwordReset')}
              />
            </InputGroup>
            {errors.passwordReset?.message && (
              <Text color="red">{`${JSON.stringify(
                errors.passwordReset.message,
              )}`}</Text>
            )}
          </FormControl>
        </Stack>

        <Button
          isLoading={isSubmitting}
          loadingText="Enviando"
          type="submit"
          size={'lg'}
          mt={6}
          colorScheme="yellow"
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
