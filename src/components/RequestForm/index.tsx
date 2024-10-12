import { SimpleGrid, Button, Flex, Box, Text } from "@chakra-ui/react";
import { Select } from "../Forms/Select";
import { useForm } from "react-hook-form";
import { convertDataToSelect } from "../../utils/convertDataToSelect";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../Forms/textarea";
import { Input } from "../Forms/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { requestTypesService } from "../../services/Home/requestType";
import { toast } from "react-toastify";
import { IRequest, IRequestType } from "../../schema/HomeCard";
import { homeModalRequestService } from "../../services/Home/homeRequestModal";
import useColabContext from "../../context_api";
import { PaperclipHorizontal, XCircle } from "phosphor-react";

export interface RequestType {
  id: string | number;
  description: string;
}

interface RequestItem {
  handleCloseModal: () => void;
}

const promoveUserSchema = z.object({
  request_type_id: z
    .number({
      required_error: "Tipo de Solicitação é necessário",
      invalid_type_error: "Campo obrigatório",
    })
    .nonnegative("Campo obrigatório"),
  start_date: z.string().min(10, "Campo obrigatório"),
  note: z.string(),
});

interface DurationState {
  isHalfDay: boolean;
  isLonge: boolean;
}

interface DurationStateSelected {
  isHalfDay: boolean;
  isLonger: boolean;
  isOneDay: boolean;
  isMornning: boolean;
  isAfternoon: boolean;
  isLongerExtended: boolean;
}

type PromoveUserSchemaInputs = z.infer<typeof promoveUserSchema>;

interface IAnexoUpload {
  isFile: boolean;
  target: string;
  name: string;
  size: string;
}

export function RequestForm({ handleCloseModal }: RequestItem) {
  const [durationState, setDurationState] = useState<DurationState>({
    isHalfDay: false,
    isLonge: false,
  });

  const { colabProvider } = useColabContext();

  const [isLoadin, setIsLoading] = useState<boolean>(false);
  const [uploadIsRequired, setUploadIsRequired] = useState<boolean>(false);

  const [requestType, setRequestType] = useState<RequestType[]>([]);
  const [endDate, setEndDate] = useState<string>("");
  const [minEndDate, setMinEndDate] = useState<string>("");

  const [anexoSelected, setAnexoSelected] = useState<IAnexoUpload>({
    isFile: false,
    target: "",
    name: "",
    size: "",
  });

  useEffect(() => {
    setTimeout(async () => {
      const response = await requestTypesService();
      setRequestType(response as IRequestType[]);
    }, 1000);
  }, []);

  const [durationStateSelected, setDurationStateSelected] =
    useState<DurationStateSelected>({
      isHalfDay: false,
      isLonger: false,
      isOneDay: false,
      isMornning: false,
      isAfternoon: false,
      isLongerExtended: false,
    });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PromoveUserSchemaInputs>({
    resolver: zodResolver(promoveUserSchema),
  });

  async function handleSendRequest(data: PromoveUserSchemaInputs) {
    if (uploadIsRequired && !anexoSelected.isFile) {
      return toast.error("Tipo de Solicitação, necessita de Anexo!");
    }

    if (durationStateSelected.isLonger && endDate?.length === 0) {
      return toast.error("Data Final, é obrigatoria");
    }

    function makeTextDuration() {
      if (durationStateSelected.isHalfDay && durationStateSelected.isMornning) {
        return "Meio dia - manhã";
      }
      if (
        durationStateSelected.isHalfDay &&
        durationStateSelected.isAfternoon
      ) {
        return "Meio dia - tarde";
      }
      if (durationStateSelected.isOneDay) {
        return "Todo o dia";
      }
      if (durationStateSelected.isLonger) {
        return "Ausência Prolongada";
      }
    }

    const dataToSave: IRequest = {
      employee_id: colabProvider.user.id,
      reason_absence_id: data.request_type_id,
      date_start: `${data.start_date}`,
      date_end: endDate === "" ? `${data.start_date}` : `${endDate}`,
      notes: data.note,
      is_afternoon: durationStateSelected.isAfternoon,
      is_half_day: durationStateSelected.isHalfDay,
      is_longer: durationStateSelected.isLonger,
      is_longer_extended: durationStateSelected.isLongerExtended,
      is_morning: durationStateSelected.isMornning,
      is_one_day: durationStateSelected.isOneDay,
      text: String(makeTextDuration()),
      attach: anexoSelected.target,
    };

    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await homeModalRequestService(dataToSave);
        if (response) {
          if (
            response.response.statusCode === 200 ||
            response.response.statusCode === 201
          ) {
            toast.success("Solicitção enviada com Sucessoss!");
            reset();
            resetStates();
            handleCloseModal();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error(response.response.message);
          }
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }

  const resetStates = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isHalfDay: false,
      isLonger: false,
      isOneDay: false,
      isMornning: false,
      isAfternoon: false,
      isLongerExtended: false,
    });

    setDurationState({
      ...durationState,
      isHalfDay: false,
      isLonge: false,
    });
  };

  const handleActiveHalfDay = () => {
    setDurationState({
      ...durationState,
      isHalfDay: !durationState.isHalfDay,
      isLonge: false,
    });
    setDurationStateSelected({
      ...durationStateSelected,
      isHalfDay: !durationStateSelected.isHalfDay,
      isLonger: false,
      isOneDay: false,
    });
  };

  const handleActiveLonger = () => {
    setDurationState({
      ...durationState,
      isLonge: !durationState.isLonge,
      isHalfDay: false,
    });
    setDurationStateSelected({
      ...durationStateSelected,
      isOneDay: false,
      isMornning: false,
      isLonger: !durationStateSelected.isLonger,
      isAfternoon: false,
      isLongerExtended: false,
    });
  };

  const handleActiveOneDay = () => {
    setDurationState({
      ...durationState,
      isLonge: false,
      isHalfDay: false,
    });
    setDurationStateSelected({
      ...durationStateSelected,
      isOneDay: !durationStateSelected.isOneDay,
      isMornning: false,
      isLonger: false,
      isAfternoon: false,
      isLongerExtended: false,
    });
  };

  const handleActiveLongerItem = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isOneDay: false,
      isMornning: false,
      isAfternoon: false,
      isLongerExtended: !durationStateSelected.isLongerExtended,
    });
  };

  const handleActiveHalfDayMorning = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isMornning: !durationStateSelected.isMornning,
      isLonger: false,
      isOneDay: false,
      isAfternoon: false,
      isLongerExtended: false,
    });
  };

  const handleActiveHalfDayAfernoom = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isAfternoon: !durationStateSelected.isAfternoon,
      isLonger: false,
      isOneDay: false,
      isMornning: false,
      isLongerExtended: false,
    });
  };

  function onSelectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setAnexoSelected({
          ...anexoSelected,
          isFile: true,
          name: file.name,
          size: file.size,
          target: reader.result?.toString() || "",
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleInputFile() {
    document.getElementById("inputFileRef")?.click();
  }

  const removeAnexoSelected = () =>
    setAnexoSelected({
      ...anexoSelected,
      isFile: false,
      name: "",
      size: "",
      target: "",
    });

  const resetEndDate = () => setEndDate("");

  const handleChangeTypeRequest = (e: ChangeEvent<HTMLSelectElement>) => {
    resetStates();
    resetEndDate();
    const value: string = e.target.value;
    const typeRequestSelect: any = requestType.find(
      (item) => Number(item.id) === Number(value)
    );
    setUploadIsRequired(
      typeRequestSelect !== undefined ? typeRequestSelect.anexoRequired : false
    );
    if (typeRequestSelect.isExtended) {
      handleActiveLonger();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSendRequest)}>
      <SimpleGrid columns={1} spacing={4}>
        <Select
          label="Tipo de Solicitação"
          data={convertDataToSelect(requestType, "description")}
          {...register("request_type_id", {
            valueAsNumber: true,
          })}
          error={errors.request_type_id}
          onChange={handleChangeTypeRequest}
        />
        <Input
          label="Data de Início"
          {...register("start_date", { required: true })}
          error={errors.start_date}
          type="date"
          minDate={"2024-06-01"}
          onChange={(e) => setMinEndDate(e.target.value)}
        />
        <Flex flexDirection={"column"}>
          <Text>Duração</Text>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"48px"}
          >
            {!durationState.isHalfDay && durationState.isLonge ? null : (
              <Box
                border={"1px solid #c3c3c3"}
                borderRadius={"8px 0 0 8px"}
                width={"100%"}
                p={2}
                textAlign={"center"}
                onClick={handleActiveHalfDay}
                height={"48px"}
                alignContent={"center"}
                bgColor={durationStateSelected.isHalfDay ? "#26282a" : ""}
                color={durationStateSelected.isHalfDay ? "white" : ""}
              >
                Meio Dia
              </Box>
            )}
            {durationState.isHalfDay ? (
              <>
                <Box
                  border={"1px solid #c3c3c3"}
                  width={"100%"}
                  textAlign={"center"}
                  p={2}
                  height={"48px"}
                  alignContent={"center"}
                  bgColor={durationStateSelected.isMornning ? "#d79e2e" : ""}
                  onClick={handleActiveHalfDayMorning}
                >
                  Manhã
                </Box>
                <Box
                  border={"1px solid #c3c3c3"}
                  borderRadius={"0 8px 8px 0"}
                  width={"100%"}
                  textAlign={"center"}
                  p={2}
                  height={"48px"}
                  alignContent={"center"}
                  bgColor={durationStateSelected.isAfternoon ? "#d79e2e" : ""}
                  onClick={handleActiveHalfDayAfernoom}
                >
                  Tarde
                </Box>
              </>
            ) : null}
            {durationState.isHalfDay || durationState.isLonge ? null : (
              <Box
                textAlign={"center"}
                border={"1px solid #c3c3c3"}
                width={"100%"}
                p={2}
                height={"48px"}
                alignContent={"center"}
                bgColor={durationStateSelected.isOneDay ? "#26282a" : ""}
                onClick={handleActiveOneDay}
                color={durationStateSelected.isOneDay ? "white" : ""}
              >
                Todo o Dia
              </Box>
            )}
            {durationState.isLonge ? (
              <Box
                width={"100%"}
                textAlign={"center"}
                height={"48px"}
                alignContent={"center"}
                onClick={handleActiveLongerItem}
              >
                <Input
                  type="date"
                  borderRadius={"8px 0 0 8px"}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  minDate={String(minEndDate)}
                />
              </Box>
            ) : null}
            {durationState.isHalfDay ? null : (
              <Box
                border={"1px solid #c3c3c3"}
                borderRadius={"0 8px 8px 0"}
                width={"100%"}
                textAlign={"center"}
                alignContent={"center"}
                p={2}
                height={"48px"}
                onClick={handleActiveLonger}
                bgColor={durationStateSelected.isLonger ? "#26282a" : ""}
                color={durationStateSelected.isLonger ? "white" : ""}
              >
                Ausência Prolongada
              </Box>
            )}
          </Flex>
        </Flex>
        <Box>
          <Text>Adicione uma nota (opcional)</Text>
          <Textarea
            backgroundColor={"white"}
            style={{ borderRadius: "8px" }}
            rows={3}
            size="sm"
            error={errors.note}
            {...register("note")}
          />
        </Box>
        <Box>
          <Flex gap={2} alignItems={"center"}>
            <input
              type="file"
              accept=".png, .jpeg, .jpg, .pdf"
              onChange={onSelectFile}
              id={"inputFileRef"}
              style={{ display: "none", width: "auto" }}
            />
            <Text
              _hover={{ textDecoration: "underline" }}
              title="Adicionar um arquivo"
              onClick={handleInputFile}
              cursor={"pointer"}
            >
              Anexo
            </Text>
            <PaperclipHorizontal size={24} />
          </Flex>
          <Flex>
            {anexoSelected.isFile ? (
              <Flex gap={2} alignItems={"center"}>
                <Text color={"#C2912E"}>{anexoSelected.name}</Text>
                <Text
                  title="Remover anexo"
                  onClick={removeAnexoSelected}
                  cursor={"pointer"}
                >
                  <XCircle size={18} color={"red"} />
                </Text>
              </Flex>
            ) : (
              <Text fontSize={10} fontWeight={"regular"}>
                Nenhum anexo adicionado!
              </Text>
            )}
          </Flex>
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
          isLoading={isLoadin}
          loadingText="Enviando..."
        >
          Enviar Solicitação
        </Button>
      </Flex>
    </form>
  );
}
