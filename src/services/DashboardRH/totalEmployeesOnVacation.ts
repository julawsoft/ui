import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function getTotalEmployeesOnVacation(): Promise<number> {
  const response = await new RequestApi().get<number>(
    END_POINTS.totalEmployeesOnVacation,
  )
  return response.data
}
