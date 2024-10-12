import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function getTotalPendingAbsences(): Promise<number> {
  const response = await new RequestApi().get<number>(
    END_POINTS.totalPendingAbsences,
  )
  return response.data
}
