import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { ArrowLeft, FloppyDisk, Paperclip } from 'phosphor-react'
import { FileUploader } from 'react-drag-drop-files'
import { useState } from 'react'
import { IDtatSetup } from '../utils'

interface IStepDocuments {
  handleNext: () => void
  handleBack: () => void
  setDataSetup: any
  dataSetup: IDtatSetup
  handleDataSetup: () => void
  isFirstStep: boolean
  isLastStep: boolean
  indexStep: number
  isLoading: boolean
}

export function StepDocuments({
  isFirstStep,
  isLastStep,
  indexStep,
  handleBack,
  handleNext,
  setDataSetup,
  dataSetup,
  handleDataSetup,
  isLoading,
}: IStepDocuments) {
  const fileTypes = ['pdf', 'png', 'jpg', 'jpeg']
  const [file, setFile] = useState<string>()
  const [fileProperties, setFileProperties] = useState({
    name: '',
    size: '',
    type: '',
    isValid: false,
  })

  const handleChange = (file) => {
    setFileProperties({
      ...fileProperties,
      name: file.name,
      size: file.size,
      type: file.type,
      isValid: true,
    })

    const reader = new FileReader()

    reader.onload = function () {
      const base64String = reader.result?.toString()
      setFile(base64String)
      setDataSetup({
        ...dataSetup,
        append: base64String,
      })
    }
    reader.readAsDataURL(file)
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
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
            <Flex alignItems={'center'} gap={2}>
              <Box>
                <Paperclip size={54} weight="bold" color={'#c3912e'} />
              </Box>
              <Box>
                <Text fontSize={'1.3rem'} fontWeight={'semi-bold'}>
                  Estamos quase lá!
                </Text>
                <Text fontSize={'12px'}>
                  {' '}
                  Anexa um documento de Identificação (BI/PASSAPORT).
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box>
            <FileUploader
              height={'100%'}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              label={'Carrega ou solta o teu documento aqui'}
            />
            <Box>
              <Text>{file ? fileProperties.name : ''}</Text>
              <Text>{file ? fileProperties.type : ''}</Text>
            </Box>
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
              rightIcon={<FloppyDisk />}
              onClick={handleDataSetup}
              size={'sm'}
              color={'white'}
              colorScheme="green"
              p={4}
              isLoading={isLoading}
              loadingText="Enviando documento..."
            >
              {' '}
              Finalizar{' '}
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
