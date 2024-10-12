import { RequestApi } from '../../utils/request'

export interface DocumentPersonalRequestDTO {
  attach: any
  employee_id: number
  id_identification_Type: number
}
const createPersonalDocumentRequest = (data: DocumentPersonalRequestDTO) => {
  return new RequestApi().post<any>('personal_document', data, false, {
    'Content-Type': 'multipart/form-data; boundary=undefined',
  })
}

export default createPersonalDocumentRequest
