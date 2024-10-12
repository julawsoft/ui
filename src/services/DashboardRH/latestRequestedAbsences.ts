import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'
import { ILatestRequestedAbsences } from './interfaces'

export async function getLatestRequestedAbsences(): Promise<
  ILatestRequestedAbsences[]
> {
  const response = await new RequestApi().get<ILatestRequestedAbsences[]>(
    END_POINTS.latestRequestedAbsences,
  )
  return response.data
}
