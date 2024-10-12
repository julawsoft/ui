import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function getTotalPendingRequest(): Promise<number> {
  const response = await new RequestApi().get<number>(
    END_POINTS.totalPendingRequests,
  )
  return response.data
}
