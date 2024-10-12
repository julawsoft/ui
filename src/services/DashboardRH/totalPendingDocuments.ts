import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function getTotalPendingDocuments(): Promise<number> {
  const response = await new RequestApi().get<number>(
    END_POINTS.totalPendingDocuments,
  )
  return response.data
}
