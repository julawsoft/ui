import { APIROUTES } from '../../constants/api-routes'
import { IEmployee } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

export async function chageStatusEmployee(employeeId: number, status: string)  {
  const response = await new RequestApi().put(APIROUTES.employeeStatus, { id: employeeId, status: status})
  return response
}
