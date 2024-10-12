import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Input } from '../../../../components/Forms/Input'
import { ArrowLeft, ArrowRight, List } from 'phosphor-react'
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

export function StepDetails({
  isFirstStep,
  isLastStep,
  indexStep,
  handleBack,
  handleNext,
  setDataSetup,
  dataSetup,
  handleDataSetup,
}: IStepProfile) {
  const detailsSchema = z.object({
    name: z.string().min(2),
    address: z.string().min(5),
    birthDate: z.string(),
  })

  type DetailsSchemaInputs = z.infer<typeof detailsSchema>

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DetailsSchemaInputs>({
    resolver: zodResolver(detailsSchema),
  })

  async function handleSendRequest(data: DetailsSchemaInputs) {
    const newDataSetup = {
      ...dataSetup,
      name: data.name,
      address: data.address,
      birthdate: data.birthDate,
    }
    setDataSetup(newDataSetup)
    handleNext()
  }

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
                  <List size={54} color={'#c3912e'} />
                </Box>
                <Box>
                  <Text fontSize={'1.3rem'} fontWeight={'semi-bold'}>
                    Informações Pessoais
                  </Text>
                  <Text fontSize={'12px'}>
                    {' '}
                    Preencha os campos abaixo para se juntar à equipa
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection={'column'} gap={4}>
                <Input
                  label="Teu Nome"
                  placeholder="Teu nome"
                  error={errors.name}
                  {...register('name')}
                  defaultValue={dataSetup.name}
                />
                <Input
                  label="Teu endereço"
                  placeholder="Teu endereço"
                  error={errors.address}
                  {...register('address')}
                  defaultValue={dataSetup.address}
                />
                <Input
                  label="Tua data de nascimento"
                  type="date"
                  error={errors.birthDate}
                  {...register('birthDate')}
                  defaultValue={dataSetup.birthdate}
                  maxDate={new Date().toLocaleDateString()}
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
