export type IFormFilters = {
  provinceId: number | null
  categoriaId: number | null
  departamentId: number | null
  typeContractId: number | null
  status: string | null
  download: boolean
}

export enum ReportColaboradorSchema {
  provinceId = 'province_id',
  categoriaId = 'categoria_id',
  departamentId = 'departament_id',
  typeContractId = 'type_contract',
  status ='status',
  download = 'download',
}
