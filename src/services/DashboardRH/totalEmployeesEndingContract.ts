import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'
import { IEmployeeContract } from './interfaces'

export async function getTotalEmployeesEndingContract(): Promise<
  IEmployeeContract[]
> {
  const response = await new RequestApi().get<IEmployeeContract[]>(
    END_POINTS.employeesEndingContract,
  )
  return response.data
}
