import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Input } from '../../../../components/Forms/Input'
import { ArrowLeft, ArrowRight, Bank } from 'phosphor-react'
import { IDtatSetup } from '../utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface IStepProfile {
  handleNext: () => void
  handleBack: () => void
  setDataSetup: any
  dataSetup: IDtatSetup
  handleDataSetup: () => void
  isFirstStep: boolean
  isLastStep: boolean
  indexStep: number
}

export function StepBank({
  isFirstStep,
  isLastStep,
  indexStep,
  handleBack,
  handleNext,
  dataSetup,
  setDataSetup,
  handleDataSetup,
}: IStepProfile) {
  const bankSchema = z.object({
    bankName: z.string().min(2),
    bankAccount: z.string().min(5),
    bankIban: z.string().min(10),
    ss: z.string().min(4),
  })

  type BankSchemaInputs = z.infer<typeof bankSchema>

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BankSchemaInputs>({
    resolver: zodResolver(bankSchema),
  })

  async function handleSendRequest(data: BankSchemaInputs) {
    const newDataSetup = {
      ...dataSetup,
      bankName: data.bankName,
      bankAccount: data.bankAccount,
      bankIban: data.bankIban,
      ss: data.ss,
    }
    setDataSetup(newDataSetup)
    handleNext()
  }

  const handleSkip = () => handleNext()

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      <form onSubmit={handleSubmit(handleSendRequest)}>
        <Box
          bgColor={'white'}
          p={8}
          borderRadius={8}
          position={'relative'}
          width={isMobile ? 'auto' : '500px'}
          height={'auto'}
        >
          <Box minH={'200px'}>
            <Box mb={'2rem'} borderBottom={'1px solid #f5f5f7'}>
              <Flex alignItems={'center'} gap={4}>
                <Box>
                  <Bank size={54} color={'#c3912e'} />
                </Box>
                <Box>
                  <Text fontSize={'1.3rem'} fontWeight={'semi-bold'}>
                    Banco e Segurança Social
                  </Text>
                  <Text fontSize={'12px'}> Preencha os campos abaixo</Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection={'column'} gap={4}>
                <Input
                  label="Teu Banco"
                  placeholder="Teu banco"
                  error={errors.bankName}
                  {...register('bankName', { required: false })}
                  defaultValue={dataSetup.bankName}
                />
                <Input
                  label="Teu n.º de Conta"
                  placeholder="xxxx-xxxx-xxxx"
                  type="number"
                  min={25}
                  max={25}
                  error={errors.bankAccount}
                  {...register('bankAccount', { required: false })}
                  defaultValue={dataSetup.bankAccount}
                />
                <Input
                  label="Teu n.º de IBAN"
                  placeholder="xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-x"
                  error={errors.bankIban}
                  {...register('bankIban')}
                  defaultValue={dataSetup.bankIban}
                />
                <Input
                  label="Teu n.º de Seguro Social"
                  placeholder="xxxx-xxxx"
                  type="text"
                  error={errors.ss}
                  {...register('ss')}
                  defaultValue={dataSetup.ss}
                />
              </Flex>
            </Box>
          </Box>
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
                disabled={true}
              >
                Voltar
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                size={'sm'}
                onClick={handleSkip}
              >
                Skip{' '}
              </Button>
              <Button
                rightIcon={<ArrowRight />}
                size={'sm'}
                color={'white'}
                colorScheme="yellow"
                type="submit"
                p={4}
              >
                {' '}
                Proximo{' '}
              </Button>
            </Flex>
          </Box>
        </Box>
      </form>
    </>
  )
}
