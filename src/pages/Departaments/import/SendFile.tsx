import { Box, Button, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { formatFileSize } from '../../../utils/file'
import useAsyncState from '../../../hooks/use-async-state'
import { toast } from 'react-toastify'
import getEmployeeCSVSend from '../../../services/Employee/get-employee-csv-send-file.service'

const SendFileCSV = () => {
  const fileTypes = ['csv', 'xls', 'xlsx']

  const { loading, setLoading, setError, setMessage } = useAsyncState<string>()

  const [file, setFile] = useState<string>()
  const [fileProperties, setFileProperties] = useState({
    name: '',
    size: '',
    type: '',
    isValid: false,
  })
  const handleChange = (file) => {
    // setFile(file)
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
    }

    reader.readAsDataURL(file)
  }

  const handleSendCSV = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await getEmployeeCSVSend(file)
        if(response){

          if (response.response.statusCode !== 200)
          toast.error(response.response.message)
        else toast.success(String('Enviado com Sucesso!'))
        // setData(response)
      }
      } catch (error) {
        setError(true)
        setMessage(String(error))
        toast.error(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <>
      <Flex
        width={'100%'}
        flexDirection={'column'}
        gap={4}
        bgColor={'#fbfaf8'}
        p={4}
      >
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label={'Carrega ou solta um arquivo aqui'}
        />
        <Flex>
          <Flex flexDirection={'column'} gap={4}>
            {file ? (
              <>
                <Card>
                  <CardBody>
                    <Flex gap={2}>
                      <Text fontWeight={'medium'}>Name:</Text>
                      <Text>{fileProperties.name}</Text>
                    </Flex>
                    <Flex gap={2}>
                      <Text fontWeight={'medium'}>Tamanho:</Text>
                      <Text>{formatFileSize(fileProperties.size)}</Text>
                    </Flex>
                    <Flex gap={2}>
                      <Text fontWeight={'medium'}>Type:</Text>
                      <Text>{fileProperties.type}</Text>
                    </Flex>
                    <Flex gap={2}>
                      <Text fontWeight={'medium'}>Válido:</Text>
                      <Text>{fileProperties.isValid}</Text>
                    </Flex>
                  </CardBody>
                </Card>
                <Box>
                  {fileProperties.isValid ? (
                    <Button
                      bgColor={'#C2912E'}
                      color={'#ffffff'}
                      size="sm"
                      borderColor={'#C2912E'}
                      _hover={{
                        bg: '#1d212a',
                        color: '#fff',
                      }}
                      onClick={() => handleSendCSV()}
                      isLoading={loading}
                      loadingText="Enviando o ficheiro..."
                    >
                      Enviar
                    </Button>
                  ) : null}
                </Box>
              </>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default SendFileCSV
