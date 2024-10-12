import { RequestApi } from '../../utils/request'

export interface DocumentRequestDTO {
  description: string
  status: number
  employee_id: number
  type_doc_id: number
  notes: string
}
const createDocumentRequest = (data: DocumentRequestDTO) => {
  return new RequestApi().post<any>('document', {
    ...data,
    type_doc_id: Number(data.type_doc_id),
  })
}

export default createDocumentRequest
