import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function getTotalUnjustifiedAbsences(): Promise<number> {
  const response = await new RequestApi().get<number>(
    END_POINTS.totalUnjustifiedAbsences,
  )
  return response.data
}
