import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Plus, Notepad, Gear, NoteBlank } from "phosphor-react";

import { Brand } from "../../components/Brand";
import { Main } from "../../components/Main";
import { HeaderWithNav } from "../../components/Navs/HeaderWithNavs";
import { NavFloat } from "../../components/Navs/NavFloat";

import { NotesService } from "../../services/Notes";
import { INotesList } from "../../schema/Notes";
import Empty from "../../components/Empty";
import { TagsService } from "../../services/Notes/tags";
import { ITags } from "../../schema/Tags";
import SpinnerProgress from "../../components/SpinnerProgress";
import { CircleLink } from "../../components/Navs/CircleLink";
import { ROUTES } from "../../routes/constants";
import { toast } from "react-toastify";
import { ErrorLocal } from "../../components/ErrorLocal";
import { Init } from "../Install/Init";
import ListNoteCards from "./Components/ListNoteCards";
import PermissionGate from "../../hooks/permissionGate";
import { Roles } from "../../routes/roles";

export function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<INotesList[]>([]);

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    init();
  }, [isReload]);

  async function init() {
    try {
      setIsloading(true);
      await getAll();
    } catch (e) {
      setIsloading(false);
      toast.error(String(e));
      setIsError(true);
      setMessage(String(e));
    } finally {
      setIsloading(false);
      setIsReload(false);
    }
  }

  const getAll = async () => {
    const response = await NotesService.getAll();
    console.log(response);
    if (response) {
      setNotes(response.data);
    }
  };

  const handleNewNote = () => {
    navigate(ROUTES.InformativeNoteCreate, { state: { id: 0, back: ROUTES.InformativeNotes, data: undefined } });
  };

  const reload = () => {
    Init();
  };
  return (
    <Main>
      <HeaderWithNav title="Notas Informativas">
        <NavFloat side="left">
          <PermissionGate roles={[Roles.NOTES.can_create_note]}>
            <Button
              leftIcon={<Plus weight="bold" />}
              colorScheme="yellow"
              borderRadius={20}
              variant="outline"
              onClick={handleNewNote}
            >
              Nova nota
            </Button>
          </PermissionGate>
        </NavFloat>
        <NavFloat side="right">
          <PermissionGate roles={[Roles.NOTES.can_config_note]}>
            <CircleLink
              href="config"
              color="yellow.400"
              icon={<Gear size={24} weight="bold" />}
            />
          </PermissionGate>
        </NavFloat>
      </HeaderWithNav>
      <Flex>
        {isError ? (
          <>
            <ErrorLocal message={message} reload={reload} />
          </>
        ) : (
          <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>
            {isLoading && !isError ? (
              <Flex justifyContent={"center"} width={"100%"}>
                <SpinnerProgress />
              </Flex>
            ) : (
              <>
                {notes && notes.length ? (
                  <Flex justifyContent={"left"} width={"100%"} px={6}>
                    <ListNoteCards setNotes={setNotes} notes={notes} setIsReload={setIsReload} />
                  </Flex>
                ) : (
                  <Flex
                    width={"100%"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Brand
                      title="Sem notas Informativas"
                      description="Crie, Visualize e Compartilhe notas."
                      icon={<NoteBlank size={50} color="#C2912E" />}
                      position="center"
                    />
                    <Box>
                      <Button
                        leftIcon={<Plus weight="bold" />}
                        colorScheme="yellow"
                        borderRadius={15}
                        variant="outline"
                        onClick={handleNewNote}
                        size={"sm"}
                        title="Criar uma nota informativa"
                      >
                        Nova nota
                      </Button>
                    </Box>
                  </Flex>
                )}
              </>
            )}
          </Flex>
        )}
      </Flex>
    </Main>
  );
}
