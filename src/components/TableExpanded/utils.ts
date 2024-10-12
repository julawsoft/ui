export const caseInsensitiveSort = (rowA: any, rowB: any) => {
  const a = rowA.title.toLowerCase()
  const b = rowB.title.toLowerCase()

  if (a > b) {
    return 1
  }

  if (b > a) {
    return -1
  }

  return 0
}

export const paginationComponentOptions = {
  rowsPerPageText: 'Itens por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

export const makeData = (data: Array<any>) => {
  return []
}

export const columns: any = [
  {
    name: 'Title',
    selector: (row: any) => row.title,
    sortable: true,
    sortFunction: caseInsensitiveSort,
  },
  {
    name: 'Year',
    selector: (row: any) => row.year,
    onclick: (e: any) => {
    },
    sortable: true,
    sortFunction: caseInsensitiveSort,
  },
]

export interface InterfaceColumns {
  id: string
  name: string
  isSortable: boolean
}

export const makeColumns = (columns: any) => {
  return (
    columns &&
    columns.map((column: InterfaceColumns, key: number) => {
      return {
        width: key == 0 ? '80px' : key === columns.length - 1 ? '120px' : '',
        name: column.name,
        sortable: column.isSortable,
        selector: (row: any) => row[`${column.id.toLowerCase()}`],
      }
    })
  )
}
