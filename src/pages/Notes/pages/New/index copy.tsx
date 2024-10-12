import { ArrowLeft, Plus, UploadSimple } from 'phosphor-react'

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
} from '@chakra-ui/react'

import { useEffect, useRef, useState } from 'react'
import { Select } from '../../../../components/Forms/Select2'
import { Modal } from '../../../../components/Forms/Modal'
import { useForm } from 'react-hook-form'

import Editor from '../../../../components/Editor'
import { convertDataToSelect } from '../../../../utils/convertDataToSelect'
import { TagsService } from '../../../../services/Notes/tags'
import { NotesService } from '../../../../services/Notes/index'
import { Switch } from '../../../../components/Forms/Switch'
import { useNavigate } from 'react-router-dom'
import { canvasPreview } from '../../../../utils/crop/canvas/canvas'
import { defaultImage } from '../../../../utils/crop/defaultImage'
import useColabContext from '../../../../context_api'

export function NewNotes() {
  const { colabProvider } = useColabContext()

  const toast = useToast()

  const [editorText, setEditorText] = useState<String>('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [tags, setTags] = useState<any[]>([])
  const [status, setStatus] = useState<boolean>(false)

  const [crop, setCrop] = useState<Crop>()
  const [imgSrc, setImgSrc] = useState('')
  const [imgSrcEnd, setImgSrcEnd] = useState(defaultImage)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [aspect, setAspect] = useState<number>(16 / 9)

  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const init = async () => {
      await getTags()
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

  async function getTags() {
    const response = await TagsService.getAll()
    setTags(response.data)
  }

  async function handleSaveNote(data: any) {
    const deptoId = getDeptoOfUser(data.depto_id)
    const dataToSave = {
      ...data,
      image: imgSrcEnd,
      description: editorText,
      depto_id: deptoId,
      employee_id: colabProvider.user.id,
      link: '',
      status,
    }
    const response = await NotesService.saveNote(dataToSave)
    showToast(response.response.statusCode)
  }

  function showToast(status: number) {
    if (status === 200) {
      toast({
        title: 'Nota informativa salva',
        description: `${JSON.stringify('Nota criada com sucesso!')}`,
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
        description: `${JSON.stringify('Erro ao criar a Nota')}`,
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
      <HeaderWithNav title={`Nova - Nota Informativa`}>
        <NavFloat side="left">
          <CircleLink
            href="/notes"
            icon={<ArrowLeft size={20} />}
            color="gray.200"
          />
        </NavFloat>
      </HeaderWithNav>
      <Flex
        p={6}
        display="grid"
        gridTemplateColumns="1fr"
        gap={8}
        placeItems={'center'}
      >
        <Flex flexDir="column" gap={8} mb={8}>
          <Box
            border="1px"
            borderColor="gray.100"
            borderRadius="md"
            overflow="auto"
          >
            <form onSubmit={handleSubmit(handleSaveNote)}>
              <SimpleGrid columns={1} spacing={6}>
                <Box as={Flex} gap={5} flexDirection={'column'}>
                  <Image
                    alt={'Image from informative notes'}
                    objectFit={'fill'}
                    src={imgSrcEnd === '' ? defaultImage : imgSrcEnd}
                    height={240}
                  />
                  <Flex justifyContent={'end'} alignItems={'center'} mr={2}>
                    <Box
                      borderRadius={4}
                      bg={'#d69e2e'}
                      color={'#fff'}
                      p={2}
                      title="Escolha uma imagem"
                      onClick={chooseImage}
                      cursor={'pointer'}
                    >
                      Adicionar imagem
                    </Box>
                  </Flex>
                </Box>
              </SimpleGrid>

              <SimpleGrid columns={1} spacing={6} mt={4} p={2}>
                <Input
                  error={errors.title}
                  label="Título"
                  type="text"
                  placeholder={'Digite aqui um título'}
                  {...register('title', {
                    required: 'Campo obrigatório',
                  })}
                />
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={6} mt={6} p={2}>
                <Select
                  error={errors.tag_id}
                  label="Classificação"
                  data={convertDataToSelect(tags, 'tag')}
                  {...register('tag_id', {
                    valueAsNumber: true,
                    required: 'Campo obrigatório',
                  })}
                />

                <Select
                  error={errors.depto_id}
                  label="Abrangêcia da nota"
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
              </SimpleGrid>
              <SimpleGrid>
                <Flex flexDir="column" gap={2} mt={8} mb={8} p={2}>
                  <Text>Descrição: </Text>
                  <Editor onChange={onChangeEditor} />
                </Flex>
              </SimpleGrid>
              <SimpleGrid p={2}>
                <Switch
                  label={status ? 'Nota Activa' : 'Nota Inactiva'}
                  name="status"
                  isChecked={status}
                  direction="column"
                  onChange={(evt: any) => handleChangeStatus(evt.target)}
                />
              </SimpleGrid>

              <Flex width="100%" mt={6} gap={'2'} p={2}>
                <Button
                  onClick={() => navigate('/notes')}
                  type="button"
                  bgColor={'transparent'}
                  border="1px solid #c3ccc3"
                  color="#767676"
                  size="lg"
                  width={100}
                  colorScheme="transparent"
                >
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="green" size="lg" width={150}>
                  Salvar
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModalEditImage}
        title="Editar imagem"
        description="Editar a imagem que irá representar a nota"
        size="3xl"
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
                  Salvar
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
