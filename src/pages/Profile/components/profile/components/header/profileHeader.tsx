import {
  Box,
  Button,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { Pencil, Upload, UserCirclePlus } from 'phosphor-react'
import { Modal } from '../../../../../../components/Forms/Modal'
import { useDropzone } from 'react-dropzone'
import { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getCroppedImg } from './header.types'
import useAsyncState from '../../../../../../hooks/use-async-state'
import { Toast } from '../../../../../../components/Toast'

export const ProfileHeader = ({
  name,
  position,
  id,
  image,
  onPhotoChange,
}: {
  id: number
  name: string
  position: string
  image?: string
  onPhotoChange: () => void
}) => {
  const { handleSubmit } = useForm()
  const { setLoading, toastMessage, setToastMessage } = useAsyncState()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isFileTooLarge, setIsFileTooLarge] = useState(false)
  const [files, setFiles] = useState<any>([])
  const imgRef = useRef<HTMLImageElement>(null)
  const [cropedFile, setCroppedFile] = useState<any>()
  const [errorFile] = useState<string>()
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const MAX_UPLOAD_SIZE = 5242880
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      maxFiles: 1,
      maxSize: MAX_UPLOAD_SIZE,
      accept: {
        'image/*': ['.jpg', '.png', '.jpeg'],
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

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
      setFiles([])
      setCroppedFile(undefined)
    }
  }, [])

  const thumbs = files.map((file) => {
    const onCropComplete = (crop) => {
      if (imgRef.current && crop.width && crop.height) {
        const croppedImageUrl = getCroppedImg(
          imgRef.current,
          crop,
          setCroppedFile,
        )

        setCroppedFile(croppedImageUrl)
      }
    }

    return (
      <div
        style={{
          display: 'inline-flex',
          borderRadius: 2,
          border: '1px solid #eaeaea',
          marginBottom: 8,
          marginRight: 8,
          width: '100%',
          padding: 4,
          boxSizing: 'border-box',
        }}
        key={file.name}
      >
        <div
          style={{
            display: 'flex',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          <ReactCrop
            aspect={1 / 1}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={onCropComplete}
          >
            <img
              ref={imgRef}
              alt="preview"
              src={file.preview}
              style={{
                display: 'block',
                width: 'auto',
                height: '100%',
              }}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          </ReactCrop>
        </div>
      </div>
    )
  })

  const handleSave: SubmitHandler<any> = async (data) => {
    try {
      setLoading(true)

      const submitURL = import.meta.env.VITE_BASE_URI + 'employees/' + id
      const data: FormData = new FormData()
      if (files.length === 0) {
        // setErrorFile('Sem ficheiro')
        return
      }

      data.append('photo', cropedFile as any)

      await fetch(submitURL, {
        method: 'put',
        body: data,
      })

      updateUserData()
      onClose()
      setToastMessage({
        message: 'A tua foto de perfil foi alterada',
        status: 'success',
        title: 'Sucesso',
      })
      setLoading(false)
      // onSave()
      onPhotoChange()
    } catch (erro) {}
  }

  const updateUserData = async () => {}

  return (
    <>
      <Box
        height={{ base: '220px', md: '220px', lg: '130px' }}
        width={{ base: '210px', lg: '120px' }}
        backgroundColor={image ? '#333' : '#ddd'}
        position="relative"
        margin="0 auto"
        marginBottom={6}
        transform="translate(0, -50%)"
        paddingTop="0px"
        cursor="pointer"
        borderRadius={8}
        backgroundImage={import.meta.env.VITE_URL_STATIC_FILES + '/' + image}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        display="flex"
        flexDirection="row"
        alignItems="center"
        onClick={() => {
          onOpen()
        }}
      >
        {image && (
          <Tooltip
            label="Clica para alterar a tua foto"
            aria-label="Foto de perfil"
          >
            <Box
              p={2}
              zIndex={2}
              backgroundColor="#C2912E"
              borderRadius="50%"
              width="40px"
              position="relative"
              right={{ base: '-185px', lg: '-100px' }}
              bottom={{ base: '-105px', lg: '-60px' }}
            >
              <Pencil size={24} color="#eee" />
            </Box>
          </Tooltip>
        )}
        {!image && (
          <Box flex={1}>
            <UserCirclePlus size={52} style={{ margin: '0 auto' }} />
          </Box>
        )}
      </Box>
      <Text as="b" fontSize={24}>
        {name}
      </Text>
      <Text fontSize={20}>({position})</Text>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Foto de perfil"
        description="Altere a tua foto de perfil"
        size="lg"
      >
        <form onSubmit={handleSubmit(handleSave)}>
          <SimpleGrid
            columns={1}
            spacing={1}
            justifyItems="start"
            justifyContent="end"
          >
            <Box
              flex={1}
              {...getRootProps({ className: 'dropzone' })}
              style={{ flex: 1, width: '100%' }}
            >
              {toastMessage && (
                <Toast
                  title={toastMessage.title}
                  description={toastMessage.message}
                  status={toastMessage.status}
                  isShow={!!toastMessage}
                ></Toast>
              )}
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
                  Arraste e solte a tua fotografia aqui, ou Clica para procurar
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
            <Box
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                type="submit"
                style={{ backgroundColor: '#C2912E', color: '#fff' }}
              >
                Carregar
              </Button>
            </Box>
          </SimpleGrid>
        </form>
      </Modal>
    </>
  )
}
