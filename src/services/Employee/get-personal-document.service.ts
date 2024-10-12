import { RequestApi } from '../../utils/request'


export interface IPersonalDocument {
    id: number,
    employee_id: number,
    type_personal_doc_id: number,
    doc_number: string,
    validate_date: string,
    date_issue: string,
    attach: string,
    description: string,
    created_at: string,
    updated_at: string,
    TypePersonalDoc: {
        id: number,
        description: string
    }
}


const getPersonalDocument = async (employeeId: number) => {
  return (await new RequestApi().get<IPersonalDocument[]>(`/personal_employee_document/${employeeId}`))
}

export default getPersonalDocument
