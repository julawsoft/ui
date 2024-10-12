import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { HeaderWithNav } from '../../../components/Navs/HeaderWithNavs'
import { NavFloat } from '../../../components/Navs/NavFloat'
import { CircleLink } from '../../../components/Navs/CircleLink'
import { ArrowLeft, Download } from 'phosphor-react'
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import SendFileCSV from './SendFile'
import { APIROUTES } from '../../../constants/api-routes'

// http://127.0.0.1:5000/api/v1/download_sample_employee

const url = import.meta.env.VITE_BASE_URI

const ImportCSV = () => {
  const { state } = useLocation()
  const fileTypes = ['csv', 'xls', 'xlsx']

  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<string>()

  const [file, setFile] = useState(null)
  const [fileProperties, setFileProperties] = useState({
    name: '',
    size: '',
    type: '',
    isValid: false,
  })
  const handleChange = (file) => {
    setFile(file)
    setFileProperties({
      ...fileProperties,
      name: file.name,
      size: file.size,
      type: file.type,
      isValid: true,
    })
  }

  const handleSendCSV = () => {}

  const downloadFile = async () => {
    const fileUrl = `${url}/${APIROUTES.downloadCSVModel}` // Substitua  pela URL do seu arquivo
    const fileName = 'modelo_employee' // Substitua  pelo nome do arquivo

    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()

      // Remove o elemento após o Clica
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error)
    }
  }

  const handleDownload = () => {
    downloadFile()
  }
  return (
    <>
      <Flex width={'100%'} flexDirection={'column'}>
        <HeaderWithNav title={'Import CSV '}>
          <NavFloat side="left">
            <CircleLink
              href={state.back}
              icon={<ArrowLeft size={20} />}
              color="gray.200"
            />
          </NavFloat>
        </HeaderWithNav>
        <Flex mt={4} gap={4} direction={{ base: 'column', md: 'row' }}>
          <Flex width={'100%'}>
            <Card width={'100%'}>
              <CardHeader>
                <Heading size={'18px'}>
                  <Text fontSize={'20px'}>Download CSV modelo</Text>
                  <UnorderedList fontWeight={'medium'}>
                    <ListItem>Faça o download do ficheiro modelo</ListItem>
                    <ListItem>
                      Verifique os campos que são obrigatórios
                    </ListItem>
                    <ListItem>Preencha os campos</ListItem>
                    <ListItem>Faça o upload do ficheiro alterado</ListItem>
                    <ListItem textColor={'red'}>
                      Não repetir o processo em caso de sucesso
                    </ListItem>
                  </UnorderedList>
                </Heading>
              </CardHeader>

              <CardBody>
                <Button
                  rightIcon={<Download />}
                  colorScheme="gray"
                  variant="outline"
                  onClick={handleDownload}
                  isLoading={loading}
                  loadingText="Baixando..."
                >
                  Download CSV Modelo
                </Button>
              </CardBody>
            </Card>
          </Flex>
          <SendFileCSV />
        </Flex>
      </Flex>
    </>
  )
}

export default ImportCSV
