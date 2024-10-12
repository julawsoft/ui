import { SimpleGrid, Button, Flex, Box, Text, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { convertDataToSelect } from "../../utils/convertDataToSelect";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../Forms/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IDocumentRequest, IRequestType } from "../../schema/HomeCard";
import useColabContext from "../../context_api";
import SpinnerProgress from "../SpinnerProgress";
import { requestDocumentTypesService } from "../../services/Home/requestDocumenyType";
import { homeModalDocumentRequestEditService, homeModalDocumentRequestService } from "../../services/Home/homeRequestModal";
import { displayName } from "react-quill";
import { IValueEditModal } from "../../pages/Home";
// import { Select } from "../Forms/Select";

export interface RequestType {
  id: string | number;
  description: string;
}

interface IRequestFormDocument {
  handleCloseModal: () => void;
  valueEditModal: IValueEditModal
  reload?: any
  isReload?: boolean
}

const promoveUserSchema = z.object({
  note: z.string().max(40, "max 40 caracteres"),
});

type PromoveUserSchemaInputs = z.infer<typeof promoveUserSchema>;

export function RequestFormDocument({ handleCloseModal, valueEditModal, reload, isReload = false }: IRequestFormDocument) {

  const { colabProvider } = useColabContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<RequestType[]>([]);
  const [requestTypeId, setRequestTypeId] = useState<number>(valueEditModal.typeId);

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

  async function handleSendRequest(data: PromoveUserSchemaInputs) {

    if (requestTypeId === 0) {
      toast.error("O Tipo de Documento, é obrigatório")
      return false
    }

    const dataToSave: IDocumentRequest = {
      "employee_id": colabProvider.user.id,
      "type_solicitation_doc_id": requestTypeId,
      "description": data.note
    }
    valueEditModal.id === 0 ? saveModalDocument(dataToSave) : updateModalDocument(dataToSave)
  }

  const updateModalDocument = (dataToSave) => {
    setIsSaving(true);
    setTimeout(async () => {
      try {
        const response = await homeModalDocumentRequestEditService(dataToSave, valueEditModal.id)
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
              reload()
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

  const saveModalDocument = (dataToSave) => {
    setIsSaving(true);
    setTimeout(async () => {
      try {

        const response = await homeModalDocumentRequestService(dataToSave)

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
              :-
              reload()
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


  const handleChangeTypeRequest = (e: ChangeEvent<HTMLSelectElement>) => {
    setRequestTypeId(Number(e.target.value))

  };

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
            <form onSubmit={handleSubmit(handleSendRequest)}>
              <SimpleGrid columns={1} spacing={4}>
                {/*<Select
                label="Tipo de Documento"
                data={convertDataToSelect(requestType, "description")}
                {...register("request_type_id", {
                  valueAsNumber: true,
                })}
                placeholder="Seleccione uma opção"
                error={errors.request_type_id}
              
                defaultValue={valueEditModal.typeId}
              />*/}

                <Box>
                  <Text>Tipo de Documento</Text>

                  <Select
                    defaultValue={valueEditModal.typeId}
                    onChange={handleChangeTypeRequest}
                  >
                    <option value='0'>Seleccione uma Opção</option>
                    {
                      requestType && requestType.map((item) => (<option value={item.id}>{item.description}</option>))
                    }
                  </Select>
                </Box>

                <Box>
                  <Text>Efeito</Text>
                  <Textarea
                    backgroundColor={"white"}
                    style={{ borderRadius: "8px" }}
                    rows={1}
                    size="sm"
                    error={errors.note}
                    {...register("note")}
                    defaultValue={valueEditModal.description}
                    placeholder="ex.: Abertura de conta"
                  />
                </Box>
                <Box>
                </Box>
              </SimpleGrid>
              <Flex
                justifyContent={"space-between"}
                mt={4}
                borderTop="1px solid #c3c3c3"
                pt={2}
              >
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSaving}
                  loadingText="Enviando..."
                >
                  Enviar Solicitação
                </Button>
              </Flex>
            </form>
          </>)
      }
    </>

  );
}
