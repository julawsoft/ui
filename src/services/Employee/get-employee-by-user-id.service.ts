import { APIROUTES } from '../../constants/api-routes'
import { EmployeeManager } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getEmployeeUserById(id: number) {
  const response = await new RequestApi().get<EmployeeManager>(
    APIROUTES.employeeUser + '/' + id,
  )
  return response.data
}

export default getEmployeeUserById
