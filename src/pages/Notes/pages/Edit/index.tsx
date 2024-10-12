import { ArrowLeft, PencilSimple, Plus, UploadSimple } from 'phosphor-react'

import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { Main } from '../../../../components/Main'
import { HeaderWithNav } from '../../../../components/Navs/HeaderWithNavs'
import { CircleLink } from '../../../../components/Navs/CircleLink'
import { NavFloat } from '../../../../components/Navs/NavFloat'
import { Input } from '../../../../components/Forms/Input'

import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
  SimpleGrid,
  Image,
  Divider,
} from '@chakra-ui/react'

import { useEffect, useRef, useState } from 'react'
import { Select } from '../../../../components/Forms/Select2'
import { Modal } from '../../../../components/Forms/Modal'
import { useForm } from 'react-hook-form'

import Editor from '../../../../components/Editor'
import { convertDataToSelect } from '../../../../utils/convertDataToSelect'
import { NotesService } from '../../../../services/Notes/index'
import {} from '../../../../schema/Tags'
import { Switch } from '../../../../components/Forms/Switch'
import { useNavigate, useLocation } from 'react-router-dom'
import pathStaticFiles from '../../../../utils/pathStaticFiles'
import { canvasPreview } from '../../../../utils/crop/canvas/canvas'
import useColabContext from '../../../../context_api'

export function EditNote() {
  const { colabProvider } = useColabContext()
  const toast = useToast()

  const navigate = useNavigate()
  const location: any = useLocation()

  const [editorText, setEditorText] = useState<String>('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [tags] = useState<any[]>(location.state.tagNotes)

  const [status, setStatus] = useState<boolean>(location.state.status)

  const [crop, setCrop] = useState<Crop>()
  const [imgSrc, setImgSrc] = useState('')
  const [imgSrcEnd, setImgSrcEnd] = useState('')
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const init = async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop)
      }
      setAspect(16 / 9)
    }
    init()
  }, [completedCrop])

  async function handleSaveNote(dataForm: any) {
    const deptoId = getDeptoOfUser(dataForm.depto_id)

    const dataToSave = {
      ...dataForm,
      image: imgSrcEnd === '' ? location.state.image : imgSrcEnd,
      description: editorText,
      depto_id: deptoId,
      employee_id: colabProvider.user.id,
      link: '',
      status,
      tag_id: dataForm.tag_id,
    }
    const response = await NotesService.editNote(location.state.id, dataToSave)
    showToast(response.response.statusCode)
  }

  function showToast(status: number) {
    if (status === 200) {
      toast({
        title: 'Nota informativa salva',
        description: `${JSON.stringify('Nota alterada com sucesso!')}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          width: '300px',
          maxWidth: '100%',
        },
      })
      setTimeout(() => {
        resetForm()
        navigate('/notes')
      }, 3000)
    } else {
      toast({
        title: 'Error',
        description: `${JSON.stringify('Erro ao alterar a Nota')}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          width: '300px',
          maxWidth: '100%',
        },
      })
    }
  }

  function getDeptoOfUser(id: number) {
    return id === 1 ? 0 : colabProvider.user.id
  }

  function chooseImage() {
    onOpen()
  }

  function onReady(event: any, editor: any) {
    setTimeout(() => {
      event.setData(location.state.description)
    }, 1000)
  }
  async function onChangeEditor(event: any, editor: any) {
    try {
      setEditorText(editor.getData())
    } catch (e) {}
  }

  function onCloseModalEditImage() {
    setImgSrc('')
    onClose()
  }

  function resetForm() {
    reset()
    setImgSrc('')
    setImgSrcEnd('')
    setEditorText('')
  }

  function handleChangeStatus(event: any) {
    setStatus(event.checked)
  }

  function onSelectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  function onImageLoad(e: any) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  function handleSaveImage() {
    setImgSrcEnd(
      previewCanvasRef.current
        ? previewCanvasRef.current?.toDataURL().toString()
        : '',
    )
    onCloseModalEditImage()
  }

  function handleInputFile() {
    document.getElementById('inputFileRef')?.click()
  }

  return (
    <Main>
      <HeaderWithNav title={`Editar nota informativa`}>
        <NavFloat side="left">
          <CircleLink
            href="/notes"
            icon={<ArrowLeft size={20} />}
            color="gray.200"
          />
        </NavFloat>
      </HeaderWithNav>
      <Flex
        px={6}
        display="grid"
        gridTemplateColumns="1fr 1fr"
        alignItems="flex-start"
        gap={8}
      >
        <Flex flexDir="column" gap={8} mb={8}>
          <Box
            border="1px"
            borderColor="gray.100"
            borderRadius="md"
            overflow="auto"
          >
            {location.state && (
              <form onSubmit={handleSubmit(handleSaveNote)}>
                <SimpleGrid columns={1} spacing={6} mb={4}>
                  <Box as={Flex} gap={5} flexDirection={'column'}>
                    <Image
                      alt={'Image from informative notes'}
                      objectFit={'fill'}
                      src={
                        imgSrcEnd === ''
                          ? pathStaticFiles(location.state.image)
                          : imgSrcEnd
                      }
                      height={350}
                    />
                    <Flex justifyContent={'end'} alignItems={'center'} mr={2}>
                      <Box
                        borderRadius={50}
                        bg={'#d69e2e'}
                        color={'#fff'}
                        p={1}
                        title="Escolha uma imagem"
                        onClick={chooseImage}
                        cursor={'pointer'}
                      >
                        <PencilSimple size={18} />
                      </Box>
                    </Flex>
                  </Box>
                </SimpleGrid>
                <Divider />
                <SimpleGrid columns={1} spacing={6} mt={4} p={2}>
                  <Input
                    error={errors.title}
                    label="Título"
                    type="text"
                    defaultValue={location.state.title}
                    placeholder={'Digite aqui o título'}
                    {...register('title', {
                      required: 'Campo obrigatório',
                    })}
                  />
                </SimpleGrid>

                <SimpleGrid columns={2} spacing={6} mt={6} p={2}>
                  <Select
                    error={errors.tag_id}
                    label="Classificação"
                    defaultValue={location.state.tag_id}
                    data={convertDataToSelect(tags, 'tag', true)}
                    {...register('tag_id', {
                      valueAsNumber: true,
                      required: 'Campo obrigatório',
                    })}
                  />

                  <Select
                    error={errors.depto_id}
                    label="Abrangêcia da nota"
                    defaultValue={location.state.deptoId === 0 ? 1 : 2}
                    data={[
                      {
                        description: 'Geral',
                        value: 1,
                      },
                      {
                        description: 'Departamento',
                        value: 2,
                      },
                    ]}
                    {...register('depto_id', {
                      valueAsNumber: true,
                      required: 'Campo obrigatório',
                    })}
                  />

                  <Switch
                    label={status ? 'Activa' : 'Inactiva'}
                    name="status"
                    isChecked={status}
                    direction="column"
                    onChange={(evt: any) => handleChangeStatus(evt.target)}
                  />
                </SimpleGrid>

                <Flex width="100%" mt={6} p={2}>
                  <Button type="submit" colorScheme="green" size="lg">
                    Alterar
                  </Button>
                </Flex>
              </form>
            )}
          </Box>
        </Flex>
        <Flex flexDir="column" gap={4} mb={8} p={2}>
          <Box
            border="1px"
            borderColor="gray.100"
            borderRadius="md"
            overflow="auto"
          >
            <Flex flexDir="column" gap={8} mb={8} p={2}>
              <Text fontSize={16} fontWeight={'medium'}>
                {' '}
                Descrição:{' '}
              </Text>
              <Editor onChange={onChangeEditor} onReady={onReady} />
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModalEditImage}
        title="Editar imagem"
        description="Editar a imagem que irá representar a nota"
        size="5xl"
        key={1}
      >
        <form>
          <Box as="ul" display="flex" flexDir="column" gap={4}>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              id={'inputFileRef'}
              style={{ display: 'none' }}
            />
            {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
          </Box>
          <Box mt={6}>
            <Flex gap={2} justifyContent={'space-between'}>
              <Button
                type="button"
                colorScheme="green"
                size={'lg'}
                onClick={handleSaveImage}
              >
                <Flex gap={2}>
                  <Plus size={24} />
                  Adicionar
                </Flex>
              </Button>
              <Button
                type="button"
                bg={'#d69e2e'}
                size={'lg'}
                onClick={handleInputFile}
              >
                <Flex gap={2}>
                  <UploadSimple size={24} />
                  Buscar uma Imagem
                </Flex>
              </Button>
            </Flex>
          </Box>

          {!!completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
                display: 'none',
              }}
            />
          )}
        </form>
      </Modal>
    </Main>
  )
}
