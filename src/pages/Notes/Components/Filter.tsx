import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import Container from "./Container";

const SelectItemsFilter = ["naruto"];

interface IDataFilter {
  key: string;
  value: string;
}

interface IFilter {
  title: string
  setValueFilter: any
  itemSelected: string[]
  data: IDataFilter[];
}

export default function Filter({ title, setValueFilter, data, itemSelected }: IFilter) {

    const handleClickFilter = (item: string) => {
        if(!itemSelected.includes(item))
            setValueFilter([...itemSelected, item])
    }

  return (
    <>
      <Container title={title} bgColor="#F5F5F5">
        <CheckboxGroup colorScheme="yellow" defaultValue={itemSelected}>
          <Flex flexDirection={"column"} gap={2}>
            {
                data.map((item: IDataFilter) => ( <Checkbox onChange={(e) =>handleClickFilter(e.target.value)} value={item.key}>{item.value}</Checkbox>))
            }
          </Flex>
        </CheckboxGroup>
      </Container>
    </>
  );
}
