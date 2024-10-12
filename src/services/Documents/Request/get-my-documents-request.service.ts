import { RequestApi } from '../../../utils/request'

const getMyDocumentsRequest = async (employeeId: number) => {
  return (
    await new RequestApi().get<any[]>('all_employee_document/' + employeeId)
  ).data
}

export default getMyDocumentsRequest
