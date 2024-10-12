import { useState } from 'react'
import DataTable from 'react-data-table-component'

import { Box, Input, Text } from '@chakra-ui/react'

import SpinnerProgress from '../SpinnerProgress'
import Empty from '../Empty'

import { Container, HeaderTable, BodyTable } from './styled'

import {
  InterfaceColumns,
  makeColumns,
  paginationComponentOptions,
} from './utils'

interface PropsTable {
  isLoading?: boolean
  columns: InterfaceColumns[]
  dataSource: Array<any>
  placeholder: string
  searchKeys?: string[]
}

export function TableExpanded({
  isLoading,
  columns,
  dataSource,
  searchKeys = ['description'],
  placeholder,
}: PropsTable) {
  const [filterData, setFilterData] = useState(dataSource)
  const [isEmpty, setIsEmpty] = useState(false)

  const handleFilter = (e: string) => {
    if (e.length === 0) return setFilterData(dataSource)

    const filterDuplicate = new Set()
    const removeeDuplicate = new Set()

    for (const item of searchKeys) {
      filterDuplicate.add([
        ...dataSource.filter((items: any) => {
          return (
            items[item] && items[item].toLowerCase().includes(e.toLowerCase())
          )
        }),
      ])
    }

    const filteredItems = [...removeeDuplicate]

    setIsEmpty(filteredItems.length === 0)
    setFilterData(filteredItems)
  }

  const ExpandedComponent = (data: any) => {
    return (
      <Box bg="gray.50" p={4} textAlign="center">
        <Text fontWeight="bold" fontSize="18px">
          Descrição
        </Text>
        <Text fontSize="12px">{data.data.description}</Text>
      </Box>
    )
  }

  return (
    <Container>
      <HeaderTable>
        <Input
          focusBorderColor="yellow.400"
          size="lg"
          type="search"
          onChange={(e: any) => handleFilter(e.target.value)}
          placeholder={placeholder}
        />
      </HeaderTable>

      <BodyTable>
        <DataTable
          customStyles={{
            headRow: {
              style: {
                background: '#25282A',
                color: '#C2912E',
                borderRadius: '8px 8px 0 0',
                fontFamily: 'Roboto',
                fontSize: '14px',
              },
            },
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
          noDataComponent={<Empty title="Nenhum registo encontrado" />}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </BodyTable>
    </Container>
  )
}
