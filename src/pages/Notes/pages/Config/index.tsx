import { ArrowLeft, Gear } from "phosphor-react";

import { Main } from "../../../../components/Main";
import { HeaderWithNav } from "../../../../components/Navs/HeaderWithNavs";
import { NavFloat } from "../../../../components/Navs/NavFloat";

import {
  Box,
  Button,
  Flex,
  useDisclosure,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Modal } from "../../../../components/Forms/Modal";
import { useForm } from "react-hook-form";

import { Table } from "../../../../components/Table/index";
import { ButtonNew } from "../../../../components/Forms/ButtonNew";
import { Brand } from "../../../../components/Brand/index";
import { CircleLink } from "../../../../components/Navs/CircleLink";
import { NotesService } from "../../../../services/Notes/index";
import { INotesClassification } from "../../../../schema/NotesInformative";
import { dataTransform, columns } from "./transform";
import { Input } from "../../../../components/Forms/Input";
import SpinnerProgress from "../../../../components/SpinnerProgress/index";

export function ConfigNotes() {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const [data, setData] = useState<INotesClassification[]>([]);
  const [dataEdit, setDataEdit] = useState({ id: 0, description: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const init = async () => {
      try {
        await getAll();
      } catch (err) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: JSON.stringify(err),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          containerStyle: {
            width: "300px",
            maxWidth: "100%",
          },
        });
      }
    };
    setTimeout(() => {
      init();
    }, 1000);
  }, [toast]);

  const getAll = async () => {
    setIsLoading(true);
    const response = await NotesService.getAllClassification();
    setData(response);
    setIsLoading(false);
  };

  async function handleSave(data: any) {
    try {
      const saveData: INotesClassification = { tag: data.description };
      const response = await NotesService.saveTagNote(saveData);
      if (response) {
        if (response.response.statusCode === 200) {
          toast({
            title: "Informação",
            description: "Avaliação terminada com Sucesso",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            containerStyle: {
              width: "300px",
              maxWidth: "100%",
            },
          });
          await getAll();
          reset();
          onClose();
        } else {
          toast({
            title: "Error",
            description: JSON.stringify(response.response.message),
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            containerStyle: {
              width: "300px",
              maxWidth: "100%",
            },
          });
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: JSON.stringify(err),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        containerStyle: {
          width: "300px",
          maxWidth: "100%",
        },
      });
    }
  }

  function onCloseModalCreate() {
    onClose();
  }

  function handleEdit(item?: any) {
    setDataEdit({ description: item.tag, id: item.id });
    setTimeout(() => {
      onOpenAdd();
    }, 1000);
  }

  function onCloseModalUpdate() {
    const dataReset = { id: 0, description: "" };
    setDataEdit(dataReset);
    onCloseAdd();
    reset();
  }

  async function handleUpdate(data: any) {
    try {
      const saveData: INotesClassification = { tag: data.description };
      const response = await NotesService.updateTagNote(dataEdit.id, saveData);
      if (response.statusCode === 200) {
        toast({
          title: "Informação",
          description: "Classificação alterada com Sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          containerStyle: {
            width: "300px",
            maxWidth: "100%",
          },
        });
        onCloseModalUpdate();
        await getAll();
      } else {
        toast({
          title: "Error",
          description: JSON.stringify(response.message),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          containerStyle: {
            width: "300px",
            maxWidth: "100%",
          },
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: JSON.stringify(err),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        containerStyle: {
          width: "300px",
          maxWidth: "100%",
        },
      });
    }
  }

  return (
    <Main>
      <HeaderWithNav title={`Classificações das Notas`}>
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
        gridTemplateColumns="1fr"
        alignItems="flex-start"
        gap={8}
      >
        <Brand
          title="Classificações"
          description="Aqui estão todas as classificações que serão associadas as notas informativas."
          icon={<Gear size={50} color="#C2912E" />}
          position="center"
        />
        {isLoading ? (
          <SpinnerProgress />
        ) : (
          <Box px={6}>
            <Table
              isLoading={isLoading}
              columns={columns}
              dataSource={dataTransform(data, handleEdit)}
              placeholder="Pesquise uma classificação"
              searchKey="description"
            />

            <ButtonNew
              alignButton="end"
              handleOnClick={onOpen}
              name="Nova classificação"
            />
          </Box>
        )}
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModalCreate}
        title="Adicionar Classificações"
        description="Adicione novas classificações para as notas informativas"
        size="lg"
        key={1}
      >
        <SimpleGrid columns={1} spacing={6} mt={4}>
          <Input
            error={errors.description}
            label="Descrição"
            placeholder="Descrição da classificação"
            required
            {...register("description", {
              required: "Campo obrigatório",
            })}
          />
          <form onSubmit={handleSubmit(handleSave)}>
            <Box as="ul" display="flex" flexDir="column" gap={4}></Box>
            <Flex mt={6} justifyItems={"flex-end"} justifyContent={"flex-end"}>
              <Button type="submit" colorScheme="green" size={"lg"}>
                Salvar
              </Button>
            </Flex>
          </form>
        </SimpleGrid>
      </Modal>

      <Modal
        isOpen={isOpenAdd}
        onClose={onCloseModalUpdate}
        title="Alterar Classificações"
        description="Adicione novas classificações para as notas informativas"
        size="lg"
        key={2}
      >
        <form onSubmit={handleSubmit(handleUpdate)}>
          <SimpleGrid columns={1} spacing={6} mt={4}>
            <Input
              error={errors.description}
              label="Descrição"
              placeholder="Descrição da classificação"
              required
              defaultValue={dataEdit.description}
              {...register("description", {
                required: "Campo obrigatório",
              })}
            />
            <Box as="ul" display="flex" flexDir="column" gap={4}></Box>
            <Flex mt={6} justifyItems={"flex-end"} justifyContent={"flex-end"}>
              <Button type="submit" colorScheme="green" size={"lg"}>
                Alterar
              </Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
    </Main>
  );
}
