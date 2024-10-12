import {
  ArrowLeft,
  ArrowsClockwise,
  FloppyDisk,
  HandPointing,
  UploadSimple,
  X,
} from "phosphor-react";

import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Main } from "../../../../components/Main";
import { HeaderWithNav } from "../../../../components/Navs/HeaderWithNavs";
import { CircleLink } from "../../../../components/Navs/CircleLink";
import { NavFloat } from "../../../../components/Navs/NavFloat";

import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Image,
  GridItem,
  Grid,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../../components/Forms/Modal";
import { useForm } from "react-hook-form";

import Editor from "../../../../components/Editor";
import { TagsService } from "../../../../services/Notes/tags";
import { NotesService } from "../../../../services/Notes/index";
import { useLocation, useNavigate } from "react-router-dom";
import { canvasPreview } from "../../../../utils/crop/canvas/canvas";
import { defaultImage } from "../../../../utils/crop/defaultImage";
import useColabContext from "../../../../context_api";
import Container from "../../Components/Container";
import { Input } from "../../../../components/Forms/Input";
import { ROUTES } from "../../../../routes/constants";
import { toast } from "react-toastify";
import { INotesInformativeToSave } from "../../../../schema/Notes";
import SpinnerProgress from "../../../../components/SpinnerProgress";
import pathStaticFiles from "../../../../utils/pathStaticFiles";

interface INotesInformative {
  id: String;
  title: String;
  description: String;
  employee_id: number;
  tag_id: number;
  image?: String;
  link?: String;
  status: boolean;
  visibility: boolean;
  created_at: String;
  updated_at: String;
}

export function NewNotes() {
  const { colabProvider } = useColabContext();

  const [userLoggedId, setUserLoggedId] = useState<number>(
    colabProvider.user.id
  );

  const { state }: any = useLocation();

  console.log(">>>>> localtion ", state);

  // `${pathStaticFiles + '/' + data?.image}`

  const initialState = {
    title: state && state.data ? state.data.title : "",
    description: state && state.data ? state.data.description : "",
    employee_id: userLoggedId,
    tag_id: 1,
    status: false,
    visibility: true,
    image:
      state && state.data
        ? `${pathStaticFiles(state.data.image)}`
        : defaultImage,
  };

  console.log(">>>>> initialState ", initialState);

  const [dataToSaveNotes, SetDataToSaveNotes] =
    useState<INotesInformativeToSave>({ ...initialState });

  const [editorText, setEditorText] = useState<String>(
    initialState.description
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tags, setTags] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState("");
  const [imgSrcEnd, setImgSrcEnd] = useState(initialState.image);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number>(16 / 9);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const init = async () => {
      await getTags();
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
      setAspect(16 / 9);
    };
    init();
  }, [completedCrop]);

  async function getTags() {
    const response = await TagsService.getAll();
    setTags(response.data);
  }

  /*
  async function handleSaveNote(data: any) {
    const deptoId = getDeptoOfUser(data.depto_id);
    const dataToSave = {
      ...data,
      image: imgSrcEnd,
      description: editorText,
      depto_id: deptoId,
      employee_id: colabProvider.user.id,
      link: "",
      status,
    };
    const response = await NotesService.saveNote(dataToSave);
    showToast(response.response.statusCode);
  }
  */

  function getDeptoOfUser(id: number) {
    return id === 1 ? 0 : colabProvider.user.id;
  }

  function chooseImage() {
    onOpen();
  }

  async function onChangeEditor(data: any) {
    try {
      console.log(" onChangeEditor >>>>>>>>>>>>>> ", data);
      setEditorText(data);
    } catch (e) {
      console.log(e);
      toast.error(String(e));
    }
  }

  function onCloseModalEditImage() {
    setImgSrc("");
    onClose();
  }

  function resetForm() {
    reset();
    setImgSrc("");
    setEditorText("");
  }

  function onSelectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: any) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function handleSaveImage() {
    setImgSrcEnd(
      previewCanvasRef.current
        ? previewCanvasRef.current?.toDataURL().toString()
        : ""
    );
    onCloseModalEditImage();
  }

  function handleInputFile() {
    document.getElementById("inputFileRef")?.click();
  }

  const [visibilidade, setVisibilidade] = useState("1");
  const [classificacao, setClassificacao] = useState("2");

  const handleOnChageVisibilidade = () => {
    console.log("visibilidade change....");
  };

  async function handleSaveNote(publish = false) {

    SetDataToSaveNotes({
      ...dataToSaveNotes,
      image: imgSrcEnd,
      description: String(editorText),
      visibility: visibilidade == "1",
      tag_id: Number(classificacao),
      status: publish,
      employee_id: userLoggedId,
    });

    if (checkInputField(dataToSaveNotes)) {

      setIsSaving(true);
      setTimeout(async () => {
        try {
          const response =
            state && state.data
              ? await NotesService.updateNote(state.data.id, dataToSaveNotes)
              : await NotesService.saveNote(dataToSaveNotes);

          if (response) {
            if (response.response.statusCode === 200) {
              toast.success(response.response.message);
              setTimeout(() => {
                navigate(state.back)
              }, 1000)

              //SetDataToSaveNotes({ ...initialState });
              //setEditorText("");
              //setImgSrcEnd(defaultImage);
            } else {
              toast.error(response.response.message);
            }
          } else {
            console.log(response);
            setIsSaving(false);
          }
        } catch (e) {
          console.log(">>>>>> <<< ", e);
          setIsSaving(false);
        } finally {
          setIsSaving(false);
        }
      }, 2000);
    }
  }

  const handleSaveAndPublishNote = () => {
    console.log("handleSaveAndPublishNote...");
  };

  const checkInputField = (data: INotesInformativeToSave) => {
    if (data.title === "") {
      toast.error("Campo Título é obrigatório");
      return false;
    }

    
    if (data.description === "" || editorText == "") {
      toast.error("Campo Descrição é obrigatório");
      return false;
    }
    

    return true;
  };

  return (
    <Main>
      <HeaderWithNav title={`Nota Informativa`}>
        <NavFloat side="left">
          <CircleLink
            href="/notes"
            icon={<ArrowLeft size={20} />}
            color="gray.200"
          />
        </NavFloat>
      </HeaderWithNav>
      <Box px={4}>
        <Grid templateColumns={"1fr 3fr"} color={"#15171c"} gap={4} w={"100%"}>
          <GridItem>
            <Flex gap={6} flexDirection={"column"}>
              <Container title="Classificação" bgColor="#f2f2f2">
                <RadioGroup
                  p={1}
                  onChange={(e) => setClassificacao(e)}
                  value={classificacao}
                >
                  <Stack direction="column">
                    <Radio colorScheme="yellow" size={"sm"} value="2">
                      Informativa
                    </Radio>
                    <Radio colorScheme="yellow" size={"sm"} value="3">
                      Instrutiva
                    </Radio>
                    <Radio colorScheme="yellow" size={"sm"} value="4">
                      Solicitação
                    </Radio>
                    <Radio colorScheme="yellow" size={"sm"} value="1">
                      Tecnologia
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Container>
              <Container title="Visibilidade" bgColor="#f2f2f2">
                <RadioGroup
                  p={1}
                  onChange={(e) => setVisibilidade(e)}
                  value={visibilidade}
                >
                  <Stack direction="column">
                    <Radio colorScheme="yellow" size={"sm"} value="1">
                      Público
                    </Radio>
                    <Radio colorScheme="yellow" size={"sm"} value="2">
                      Departamental
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Container>
            </Flex>
          </GridItem>
          <GridItem>
            <Container
              title={
                state && state.data
                  ? "Actualização da Nota Informativa"
                  : "Nova Nota Informativa"
              }
              padding="0"
            >
              {isSaving ? (
                <Flex
                  justifyContent={"center"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  height={"100px"}
                >
                  <SpinnerProgress />
                  <Text fontSize={"12px"} fontWeight={"bold"}>
                    Salvando...
                  </Text>
                </Flex>
              ) : (
                <>
                  <Flex flexDirection={"column"}>
                    <Box
                      minHeight={"400px"}
                      maxHeight={"auto"}
                      width={"100%"}
                      p={4}
                    >
                      <Flex gap={2} flexDirection={"column"}>
                        <Box mb={2}>
                          <Flex gap={1}>
                            <Image
                              alt={"Image from informative notes"}
                              objectFit={"fill"}
                              src={
                                imgSrcEnd === ""
                                  ? state && state.data
                                    ? state.data.image
                                    : defaultImage
                                  : imgSrcEnd
                              }
                              height={"100px"}
                              width={"200px"}
                              border={"1px solid #C2912E"}
                            />
                            <Flex>
                              <Button
                                bgColor={"#D4B26C"}
                                onClick={chooseImage}
                                size={"xs"}
                                title="Escolher outra imagem para a Nota Informativa"
                              >
                                <ArrowsClockwise size={14} />
                              </Button>
                            </Flex>
                          </Flex>
                        </Box>
                        <Flex width={"400px"} gap={2} flexDirection={"column"}>
                          <Text>Título: </Text>
                          <Input
                            type="text"
                            bgColor={"#fff"}
                            size={"sm"}
                            defaultValue={String(dataToSaveNotes.title)}
                            placeholder={"Digite aqui um título"}
                            onChange={(e) =>
                              SetDataToSaveNotes({
                                ...dataToSaveNotes,
                                title: e.target.value,
                              })
                            }
                          />
                        </Flex>
                        <Box>
                          <Flex flexDir="column" gap={2} mt={2} mb={8}>
                            <Text>Descrição: </Text>
                            <Editor
                              data={editorText}
                              onChange={onChangeEditor}
                            />
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                    <Flex
                      gap={2}
                      bgColor={"#D4B26C"}
                      p={4}
                      height={"64px"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box>
                        <Button
                          rightIcon={<X size={14} />}
                          size={"sm"}
                          colorScheme="red"
                          onClick={() => navigate(ROUTES.InformativeNotes)}
                        >
                          Cancelar
                        </Button>
                      </Box>
                      <Flex gap={2}>
                        <Button
                          onClick={() => handleSaveNote(false)}
                          rightIcon={<FloppyDisk size={16} />}
                          size={"sm"}
                          title="Tornar a nota não disponível para leitura"
                        >
                          Guardar
                        </Button>
                        <Button
                          rightIcon={<UploadSimple fill="#fff" size={16} />}
                          colorScheme="green"
                          size={"sm"}
                          onClick={() => handleSaveNote(true)}
                          title="Tornar a nota disponível para leitura"
                        >
                          Publicar
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              )}
            </Container>
          </GridItem>
        </Grid>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModalEditImage}
        title="Seleccione uma imagem"
        description="Seleccione uma imagem como capa da Nota Informativa"
        size="lg"
        key={1}
      >
        <form>
          <Box as="ul" display="flex" flexDir="column" gap={4}>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              id={"inputFileRef"}
              style={{ display: "none" }}
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
            <Flex
              gap={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {completedCrop ? (
                <>
                  <Button
                    type="button"
                    bg={"#D4B26C"}
                    size={"sm"}
                    onClick={handleSaveImage}
                  >
                    <Flex gap={2}>Salvar</Flex>
                  </Button>
                  <Text
                    _hover={{
                      color: "#C2912E",
                    }}
                    fontSize={"smaller"}
                    onClick={handleInputFile}
                    cursor={"pointer"}
                  >
                    Seleccione outra imagem
                  </Text>
                </>
              ) : (
                <>
                  <Flex
                    onClick={handleInputFile}
                    cursor={"pointer"}
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Text
                      _hover={{
                        color: "#C2912E",
                      }}
                      fontSize={"smaller"}
                    >
                      Clica para selecionares uma imagem
                    </Text>
                    <HandPointing />
                  </Flex>
                </>
              )}
            </Flex>
          </Box>
          {!!completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "cover",
                width: completedCrop.width,
                height: completedCrop.height,
                display: "none",
              }}
            />
          )}
        </form>
      </Modal>
    </Main>
  );
}
