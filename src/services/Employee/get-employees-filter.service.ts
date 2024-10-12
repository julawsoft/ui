import { APIROUTES } from '../../constants/api-routes'
import { IEmployee } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

export async function getFilterServiceEmployees(
  filter: string,
): Promise<IEmployee[]> {
  const response = await new RequestApi().get<IEmployee[]>(
    `${APIROUTES.employeeFilter}/${filter}`,
  )
  return response.data
}
