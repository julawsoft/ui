import { RequestApi } from '../../utils/request'

const getMyAllPersonalDocuments = async (employeeId: number) => {
  return await new RequestApi().get<any[]>(
    'employee_personal_document/' + employeeId,
  )
}

export default getMyAllPersonalDocuments
