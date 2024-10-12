import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Input } from '../../../../components/Forms/Input'
import { ArrowLeft, ArrowRight, User } from 'phosphor-react'
import { IDtatSetup } from '../utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

interface IStepProfile {
  handleNext: () => void
  handleBack: () => void
  setDataSetup: (input: IDtatSetup) => void
  dataSetup: IDtatSetup
  handleDataSetup: () => void
  isFirstStep: boolean
  isLastStep: boolean
  indexStep: number
}

export function StepProfile({
  isFirstStep,
  isLastStep,
  indexStep,
  handleBack,
  handleNext,
  setDataSetup,
  dataSetup,
  handleDataSetup,
}: IStepProfile) {
  const profileSchema = z.object({
    password: z
      .string({
        invalid_type_error: 'password',
        required_error: 'Passwords',
      })
      .min(6),
    repetirPassword: z.string().min(6),
  })

  type ProfileSchemaInputs = z.infer<typeof profileSchema>

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileSchemaInputs>({
    resolver: zodResolver(profileSchema),
  })

  async function handleSendRequest(data: ProfileSchemaInputs) {
    if (data.password !== data.repetirPassword) {
      return toast.error('Senhas não conferem')
    }

    const newDataSetup = { ...dataSetup, password: data.password }
    setDataSetup(newDataSetup)
    handleNext()
  }

  const isMobile = useBreakpointValue({ base: true, md: false })
  

  return (
    <>
      <form onSubmit={handleSubmit(handleSendRequest)}>
        <Flex
          bgColor={'white'}
          p={8}
          borderRadius={8}
          position={'relative'}
          width={isMobile ? 'auto' : '500px'}
          height={'auto'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Flex minH={'200px'} flexDirection={'column'}>
            <Flex mb={'2rem'} borderBottom={'1px solid #f5f5f7'} flexDirection={'column'}>
              <Flex alignItems={'center'} gap={2}>
                <Box>
                  <User size={54} weight="bold" color={'#c3912e'} />
                </Box>
                <Box>
                  <Text fontSize={'1.3rem'} fontWeight={'semi-bold'}>
                    Cria o seu Perfil
                  </Text>
                  <Text fontSize={'12px'}>
                    {' '}
                    Defina a tua palavra-chave (use palavra-chave forte)
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Box>
              <Flex flexDirection={'column'} gap={4}>
                <Input
                  label="Teu e-mail"
                  placeholder={dataSetup.email}
                  isDisabled={true}
                />
                <Input
                  label="Tua palavra-chave"
                  placeholder="xxxxxx"
                  type="password"
                  error={errors.password}
                  {...register('password')}
                  defaultValue={dataSetup.password}
                />
                <Input
                  label="Repetir tua palavra-chave"
                  placeholder="xxxxxx"
                  type="password"
                  error={errors.repetirPassword}
                  {...register('repetirPassword')}
                  defaultValue={dataSetup.password}
                />
              </Flex>
            </Box>
          </Flex>
          <Box mt={'3rem'} bottom={0} height={'45px'} width={'100%'}>
            <Flex
              gap={2}
              width={'100%'}
              justifyContent={'space-between'}
              alignItems={'center'}
              height={'45px'}
            >
              <Button
                leftIcon={<ArrowLeft />}
                onClick={handleBack}
                size={'sm'}
                isDisabled={isFirstStep}
              >
                Voltar
              </Button>
              <Button
                rightIcon={<ArrowRight />}
                type="submit"
                size={'sm'}
                color={'white'}
                colorScheme="yellow"
                p={4}
              >
                {' '}
                Proximo{' '}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    </>
  )
}
