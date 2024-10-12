import { Box, Button, Flex, Text } from '@chakra-ui/react'

interface IStepWelcome {
  handleNext: () => void
  handleBack: () => void
  isFirstStep: boolean
  isLastStep: boolean
  indexStep: number
}

export function StepWelcome({
  isFirstStep,
  isLastStep,
  indexStep,
  handleBack,
  handleNext,
}: IStepWelcome) {
  return (
    <>
      <Box minWidth={'400px'} mx={'5em'}>
        <Box minH={'200px'}>
          <Text>Bem-vindo a Cetim Tecnologias</Text>
        </Box>
        <Box mt={'2rem'}>
          <Flex gap={2} width={'100%'} justifyContent={'space-between'}>
            <Button onClick={handleBack} size={'sm'} disabled={indexStep === 0}>
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              size={'sm'}
              color={'white'}
              colorScheme="yellow"
            >
              {' '}
              Proximo{' '}
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
