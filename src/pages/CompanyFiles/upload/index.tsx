import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { FilePdf, Upload } from 'phosphor-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ModalProps } from '../../../@types/modal.types'
import { ButtonNew } from '../../../components/Forms/ButtonNew'
import { Input } from '../../../components/Forms/Input'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { ToastNotification } from '../../../components/ToastNotification'
import useAsyncState from '../../../hooks/use-async-state'

interface ICreateIdentificationDocument extends ModalProps {}
const UploadCompanyFiles = (props: ICreateIdentificationDocument) => {
  const { onSave } = props
  const [errorFile, setErrorFile] = useState<string>()
  const { loading, setLoading } = useAsyncState()
  const [isFileTooLarge, setIsFileTooLarge] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const [files, setFiles] = useState<any>([])
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      maxFiles: 1,
      maxSize: 5242880,
      accept: {
        'application/pdf': ['.pdf'],
      },
      onDrop: (acceptedFiles: any, fileRejection) => {
        setIsFileTooLarge(false)

        fileRejection.forEach((fileRejected) => {
          if (fileRejected.errors[0].code === 'file-too-large') {
            setIsFileTooLarge(true)
          }
          return null
        })

        setFiles(
          acceptedFiles.map((file) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          }),
        )
      },
    })

  const thumbs = files.map((file) => (
    <Box
      key={file.name}
      display="flex"
      style={{
        border: '1px dashed rgba(0,0,0,0.2)',
        borderRadius: '8px',
        width: '100%',
        padding: '16px',
      }}
    >
      <FilePdf size={32} style={{ marginRight: '8px' }} />
      <Box>
        <Text style={{ fontWeight: 'bold', fontSize: '12pt' }}>
          {file.name}
        </Text>
        <Text>{(Number(file.size / 1000) / 1000).toFixed(2)} Mb</Text>
      </Box>
    </Box>
  ))

  const handleSave: SubmitHandler<any> = async (data) => {
    const send = {
      description: data.description,
    }

    try {
      setLoading(true)
      const submitURL = import.meta.env.VITE_BASE_URI + 'company_files'
      const data: FormData = new FormData()
      if (files.length === 0) {
        setErrorFile('Sem ficheiro')
        return
      }

      data.append('attach', files[0] as any)
      data.append('description', send.description + '')

      await fetch(submitURL, {
        method: 'post',
        body: data,
      })
      toast.success('Documento carregado')

      onSave()
    } catch (erro) {
    }
  }

  if (loading) return <SpinnerProgress></SpinnerProgress>

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleSave)}
      style={{
        flex: 1,
        width: '100%',
      }}
    >
      <Flex
        flex={1}
        style={{ width: '100%' }}
        justifyContent="center"
        alignContent="center"
        flexDirection="row"
      >
        <Box
          onSubmit={handleSubmit(handleSave)}
          style={{
            flex: 1,
          }}
        >
          <SimpleGrid
            columns={1}
            spacing={1}
            justifyItems="start"
            justifyContent="end"
          >
            <Input
              label="Descrição"
              type="text"
              {...register('description', { required: 'Campo obrigatório' })}
              error={errors.description}
            />

            <Box
              flex={1}
              {...getRootProps({ className: 'dropzone' })}
              style={{ flex: 1, width: '100%' }}
            >
              <input {...getInputProps()} />
              <Box
                style={{
                  margin: '16px 0',
                  padding: '16px 8px',
                  border: '1px dashed rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#efefef',
                }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Upload size={48} color="#bbb" />
                <p>
                  Arraste e solte o seu documento aqui, ou Clica para procurar
                </p>
              </Box>
            </Box>
            {errorFile && (
              <p style={{ color: '#a00' }}>
                Por favor Seleccione o documento de identificação
              </p>
            )}
            {isFileTooLarge && (
              <p style={{ color: '#a00' }}>
                O ficheiro que tentou carregar é demasiado grande, aceitamos até
                5Mb
              </p>
            )}
            {isDragAccept && (
              <p style={{ color: '#080' }}>Este ficheiro será aceite</p>
            )}
            {isDragReject && (
              <p style={{ color: '#800' }}>Este ficheiro será rejeitado</p>
            )}
            {thumbs}
            <Box style={{ width: '100%' }}>
              <ButtonNew
                name="Salvar"
                type="submit"
                alignButton="end"
              ></ButtonNew>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <ToastNotification></ToastNotification>
    </form>
  )
}

export default UploadCompanyFiles
