import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'
import { IEmployeesByDepartment } from './interfaces'

export async function getTotalEmployeesByDepartment(): Promise<
  IEmployeesByDepartment[]
> {
  const response = await new RequestApi().get<IEmployeesByDepartment[]>(
    END_POINTS.totalEmployeesByDepartment,
  )
  return response.data
}
