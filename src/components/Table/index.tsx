import { useState } from "react";
import DataTable from "react-data-table-component";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import SpinnerProgress from "../SpinnerProgress";
import Empty from "../Empty";

import { Container, HeaderTable, BodyTable } from "./styled";

import {
  InterfaceColumns,
  makeColumns,
  paginationComponentOptions
} from "./utils";
import { MagnifyingGlass } from "phosphor-react";

interface PropsTable {
  isLoading?: boolean;
  columns: InterfaceColumns[];
  dataSource: Array<any>;
  placeholder?: string;
  searchKey?: string;
  title?: string;
}

export function Table({
  isLoading,
  columns,
  dataSource,
  placeholder,
  searchKey = "description",
  title = "Nenhum dado encontrado"
}: PropsTable) {
  const [filterData, setFilterData] = useState(dataSource);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleFilter = (e: any) => {
    if (e.length === 0) return setFilterData(dataSource);

    const filteredItems = dataSource.filter(
      (item: any) =>
        item[searchKey] &&
        item[searchKey].toLowerCase().includes(e.toLowerCase())
    );
    setIsEmpty(filteredItems.length === 0);
    setFilterData(filteredItems);
  };

  return (
    <Container>
      {!!placeholder && (
        <HeaderTable>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
              color={"gray.300"}
            >
              <MagnifyingGlass size={28} />
            </InputLeftElement>
            <Input
              focusBorderColor="yellow.400"
              size="lg"
              type="search"
              onChange={(e: any) => handleFilter(e.target.value)}
              placeholder={"Pesquise por um Colaborador"}
            />
          </InputGroup>
        </HeaderTable>
      )}

      <BodyTable>
        <DataTable
          customStyles={{
            headRow: {
              style: {
                background: "#F2F2F2",
                color: "#C2912E",
                borderRadius: "8px 8px 0 0",
                fontFamily: "Roboto",
                fontSize: "14px"
              }
            }
          }}
          columns={makeColumns(columns)}
          data={
            filterData && filterData.length === 0 && !isEmpty
              ? dataSource
              : filterData
          }
          pagination
          paginationComponentOptions={paginationComponentOptions}
          progressPending={isLoading}
          progressComponent={<SpinnerProgress />}
          noDataComponent={<Empty title={title} />}
          /* onRowClicked={onClick} */
        />
      </BodyTable>
    </Container>
  );
}
