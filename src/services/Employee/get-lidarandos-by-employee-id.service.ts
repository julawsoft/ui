import { APIROUTES } from '../../constants/api-routes'
import { IManagerEmployees } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getLideradosByEmployeeService(id: string) {
  const response = await new RequestApi().get<IManagerEmployees>(
    `${APIROUTES.liderandoByEmployee}/${id}`,
  )
  return response.data
}

export default getLideradosByEmployeeService
