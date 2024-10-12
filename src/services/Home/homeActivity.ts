import { IHomeCardActivity } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeCardActivityService() {
  const response = await new RequestApi().get<IHomeCardActivity[]>(
    END_POINTS.HOME_ACTIVITY,
  )
  return response
}
