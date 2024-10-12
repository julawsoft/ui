import { SimpleGrid, Button, Flex, Box, Text, Select, Avatar, Textarea, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { convertDataToSelect } from "../../utils/convertDataToSelect";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IDocumentDTORequest, IRequestType } from "../../schema/HomeCard";
import useColabContext from "../../context_api";
import SpinnerProgress from "../SpinnerProgress";
import { requestDocumentTypesService } from "../../services/Home/requestDocumenyType";
import { homeUpdateDocumentRequestService } from "../../services/Home/homeRequestModal";

import { TiAttachment } from "react-icons/ti";
import { DisplayDateAndHourtString } from "../../utils/convertDatas";
import { GitDiff } from "phosphor-react";
export interface RequestType {
  id: string | number;
  description: string;
}

interface IAnexoUpload {
  isFile: boolean
  target: string
  name: string
  size: string
}

interface IRequestFormDocument {
  handleCloseModal: () => void;
  valueItemDocument: IDocumentDTORequest | undefined
  reload?: any
  setShowAll?: any
  isReload?: boolean
}

const promoveUserSchema = z.object({
  note: z.string().min(0, "Campo obrigatório"),
});

type PromoveUserSchemaInputs = z.infer<typeof promoveUserSchema>;

export function RequestFormDocumentRH({ handleCloseModal, valueItemDocument, reload, setShowAll, isReload = false }: IRequestFormDocument) {

  console.log("valueItemDocument RH ", valueItemDocument)

  const { colabProvider } = useColabContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isReject, setIsReject] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<RequestType[]>([]);
  const [feedBackReject, setFeedBackReject] = useState<string>('');

  useEffect(() => {
    setIsLoading(true)
    setTimeout(async () => {
      const response = await requestDocumentTypesService();
      setRequestType(response as IRequestType[]);
      setIsLoading(false)
    }, 1000);
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PromoveUserSchemaInputs>({
    resolver: zodResolver(promoveUserSchema),
  });


  const updateModalDocument = () => {
    setIsSaving(true);
    setTimeout(async () => {
      try {
        const response = await homeUpdateDocumentRequestService(Number(valueItemDocument?.id), anexoSelected.target, 'REJECTED', feedBackReject)

        if (response) {
          if (
            response.response.statusCode === 200 ||
            response.response.statusCode === 201
          ) {
            toast.success("Solicitção enviada com Sucessoss!");
            reset();
            handleCloseModal();
            !isReload ?
              setTimeout(() => {
                window.location.reload();
              }, 1000)
              :
              setShowAll(true)
          } else {
            toast.error(response.response.message);
          }
        }
      } catch (error) {
        setIsSaving(false);
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }

  const saveModalDocument = () => {

    if(!anexoSelected.isFile) {
        toast.warn("Por favor, adicione o documento")
        return
    }
    setIsSaving(true);

    setTimeout(async () => {
      try {
        const response = await homeUpdateDocumentRequestService(Number(valueItemDocument?.id), anexoSelected.target, 'APPROVED')

        if (response) {
          if (
            response.response.statusCode === 200 ||
            response.response.statusCode === 201
          ) {
            toast.success("Solicitção rejeitada com Sucessoss!");
            reset();
            handleCloseModal();
            !isReload ?
              setTimeout(() => {
                window.location.reload();
              }, 1000)
              :
              setShowAll(true)
          } else {
            toast.error(response.response.message);
            setIsLoading(false);
          }
        } else {
          setIsSaving(false)
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsSaving(false);
        toast.error(String(error));
      } finally {
        setIsLoading(false);
        setIsSaving(false)
      }
    }, 1000);
  }

  const [anexoSelected, setAnexoSelected] = useState<IAnexoUpload>({
    isFile: false,
    target: '',
    name: '',
    size: '',
  })

  function onSelectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setAnexoSelected({
          ...anexoSelected,
          isFile: true,
          name: file.name,
          size: file.size,
          target: reader.result?.toString() || '',
        })
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleViewAnexoSelected = () => {
    const path = `${import.meta.env.VITE_BASE_URI}open_absence_attach/${valueItemDocument?.attach
      }`
    window.open(path, '_blank', 'noopener,noreferrer')
  }

  function handleInputFile() {
    document.getElementById('inputFileRef')?.click()
  }

  const handleChangeFeedBack = (event: any) => {
    setFeedBackReject(event.target.value)
  }

  const handleReject = () => {
    setIsReject(true)
    if (!feedBackReject.length) {
      toast.error("Informe o motivo da rejeição!")
      return
    } else {
      updateModalDocument()
      handleCloseModal()
    }

  }

  return (
    <>
      {
        isLoading ? (
          <Flex justifyContent={'center'} >
            { }
            <SpinnerProgress />
          </Flex>
        ) : (
          <>
            <>
              <Flex gap={2} flexDirection={'column'}>
                <Flex gap={2} alignItems={'center'}>
                  <Avatar size={'md'} name={valueItemDocument?.Employee.name} />
                  <Text fontSize={14} fontWeight={'bold'}>{valueItemDocument?.Employee.name}</Text>
                </Flex>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'semibold'}>Tipo de Documento</Text>
                  <Text bgColor={'#f2f2f2'}>{valueItemDocument?.Type_Solicitation_Doc.description}</Text>
                </Flex>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'semibold'}>Data Solicitação</Text>
                  <Text bgColor={'#f2f2f2'}>
                    {DisplayDateAndHourtString(valueItemDocument?.created_at ?? '')}
                  </Text>
                </Flex>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'semibold'}>Nota</Text>
                  <Text bgColor={'#f2f2f2'}>
                    {valueItemDocument?.description}
                  </Text>
                </Flex>
                <Flex bgColor={'#f2f2f2'} flexDirection={'column'}>
                  <Flex gap={2} alignItems={'center'}>
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg, .pdf"
                      onChange={onSelectFile}
                      id={'inputFileRef'}
                      style={{ display: 'none', width: 'auto' }}
                    />
                    <Text fontWeight={'bold'} color={'yellow.400'}>Anexo</Text>
                    {
                      !valueItemDocument?.attach && !anexoSelected.name ? (
                        <TiAttachment
                          onClick={handleInputFile}
                          size={20}
                          cursor={'pointer'}
                        />) : (null)
                    }
                  </Flex>
                  <Flex>
                    {valueItemDocument?.attach || anexoSelected.isFile ? (
                      <Flex gap={2} alignItems={'center'}>
                        <Text
                          color={'#C2912E'}
                          title="Visualizar anexo"
                          onClick={handleViewAnexoSelected}
                          cursor={'pointer'}
                        >
                          {anexoSelected.name || valueItemDocument?.attach
                            ? anexoSelected.name || valueItemDocument?.attach
                            : 'Nenhum anexo encontrado...'}
                        </Text>
                        <Text
                          _hover={{ textDecoration: 'underline' }}
                          title="Trocar o anexo"
                          onClick={handleInputFile}
                          cursor={'pointer'}
                        >
                          <GitDiff size={22} />
                        </Text>
                      </Flex>
                    ) : (
                      <Text fontSize={10} fontWeight={'regular'}>
                        Nenhum anexo adicionado!
                      </Text>
                    )}
                  </Flex>
                  <Box mt={2}>
                    <Box bgColor={'#f2f2f2'}>
                      {
                        isReject ? (
                          <>
                            <Text>Nota (obrigatória)</Text>
                            <Textarea
                              backgroundColor={'white'}
                              style={{ borderRadius: '8px' }}
                              rows={4}
                              size="sm"
                              defaultValue={feedBackReject}
                              onChange={(e) => handleChangeFeedBack(e)}
                            />
                          </>
                        ) : (null)
                      }

                    </Box>
                  </Box>
                </Flex>
              </Flex>
            </>
            <Flex
              justifyContent={"space-between"}
              mt={4}
              borderTop="1px solid #c3c3c3"
              pt={2}
            >
              <Button colorScheme="red" onClick={handleReject}>Rejeitar</Button>
              <Button
                colorScheme="green"
                isLoading={isSaving}
                loadingText="Enviando..."
                onClick={saveModalDocument}
              >
                Aprovar
              </Button>
            </Flex>
          </>)
      }
    </>
  );
}
