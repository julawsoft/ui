import { RequestApi } from '../../utils/request'


export interface ITypePersonalDocument {
  employeeId: number
  typePersonalDocId: number
  docNumber: string
  attach: string
  description: string
  validateDate: string
  issueDate: string
  documentId?: number
}


const saveTypePersonalDocument = async (
  {
    employeeId,
    typePersonalDocId,
    docNumber,
    attach,
    description,
    validateDate,
    issueDate
  }: ITypePersonalDocument) => {

  const dataToSave = {
    employee_id: employeeId,
    type_personal_doc_id: typePersonalDocId,
    doc_number: docNumber,
    attach: attach,
    description: description,
    validate_date: validateDate,
    date_issue: issueDate
  }
  return (await new RequestApi().post('personal_document', dataToSave))
}

export default saveTypePersonalDocument
