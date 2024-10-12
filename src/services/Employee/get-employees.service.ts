import { APIROUTES } from '../../constants/api-routes'
import { IPessoaFilter } from '../../pages/Pessoas'
import { IEmployee } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'


export async function getEmployees(filters): Promise<IEmployee[]> {
  console.log(filters)
  const response = await new RequestApi().get<IEmployee[]>(`${APIROUTES.employees}/${filters.employee}/${filters.departmants}/${filters.categories}/${filters.status}`)
  return response.data
}
