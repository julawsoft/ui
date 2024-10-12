import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import Container from "./Container";
import Filter from "./Filter";
import { INotesList, INotesListII } from "../../../schema/Notes";
import { useEffect, useState } from "react";
import { ITagService, TagsService } from "../../../services/Notes/tags";
import { ITags } from "../../../schema/Tags";
import { toast } from "react-toastify";
import { Data } from "../../../components/ItemNotify/styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/constants";
import { NotesService } from "../../../services/Notes";

interface IListNotesCard {
  notes: INotesList[]
  setNotes: any
  setIsReload: any
}

function transformFilter(data: any[]) {
  return data.map(item => ({ key: item.id, value: item.description }))
}
const tagsMock = [
  {
    id: 1,
    description: 'Informativo',
  }
]

const deptoMock = [
  {
    id: 1,
    description: 'DDT',
  }
]


export default function ListNoteCards({ notes, setNotes, setIsReload }: IListNotesCard) {
  const navigate = useNavigate()
  const [tags, setTags] = useState<ITagService[]>([...tagsMock]);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  const [depto, setDepto] = useState<any[]>([...deptoMock]);
  const [deptoFilter, setDeptosFilter] = useState<string[]>([]);

  async function getTags() {
    const objectFilter = { 'depto': [...deptoFilter], 'tags': [...tagsFilter] }
    const response = await TagsService.getAll();
    if (response) {
      setTags(response.data);
    }
  }


  useEffect(() => {
    async function init() {
      try {
        await getTags()
      } catch (e) {
        toast.error(String(e));
      }
      const objectFilter = { 'depto': [...deptoFilter], 'tags': [...tagsFilter] }
      console.log(tagsFilter)
      console.log(deptoFilter)
      console.log(objectFilter)
    }
    init();
  }, [tagsFilter, deptoFilter]);

  const handleClick = (id: string) => navigate(ROUTES.InformativeNotesPreview, { state: { id, back: ROUTES.InformativeNotes, data: [] } })
  const handleEdit = (id: string, data) => navigate(ROUTES.InformativeNoteCreate, { state: { id, back: ROUTES.InformativeNotes, data } })

  const handleDelete = async (id: string) => {
    console.log('handleDelete ', id)

    try {

      const response = await NotesService.removeNote(Number(id))
      setIsReload(true)
    } catch (e) {
      console.log("handleDelete", e)
      toast.error("Não foi possível excluir a Nota")
    }
  }

  const isMobile = useBreakpointValue({ base: true, md: false })
  // <Grid templateColumns={!isMobile ? "200px 1fr" : "fr"} color={"#15171c"} gap={4} w={"100%"}>

  return (
    <Grid templateColumns={"fr"} color={"#15171c"} gap={4} w={"100%"}>
      <GridItem>
        <Flex gap={6} flexDirection={!isMobile ? 'column' : 'row'}>
          {/*<Filter 
             title={"Tags"} 
             setValueFilter={setTagsFilter}
             itemSelected={tagsFilter}
             data={transformFilter(tags)} 
          />*/}
          {/*<Filter 
            title={"Departamento"} 
            setValueFilter={setDeptosFilter} 
            itemSelected={deptoFilter}
  data={transformFilter(depto)} />*/}
        </Flex>
      </GridItem>
      <GridItem>
        <Container bgColor="#fff" title="Lista das Notas">
          {
            notes && notes.length ?
              (<>
                <SimpleGrid
                  columns={{ sm: 2, md: 3, lg: 3 }}
                  spacing="15px"
                >
                  {
                    notes.map((item: INotesList) => (
                      <NoteCard
                       key={String(item.id)}
                        id={String(item.id)}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        createdAt={item.created_at}
                        tag={item.Tag.description}
                        handleClik={handleClick}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete} />
                    ))
                  }
                </SimpleGrid>
              </>) : ("")
          }
        </Container>
      </GridItem>
    </Grid>
  );
}
