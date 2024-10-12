import { ITimeOff } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeCardTimeOffService() {
  const response = await new RequestApi().get<ITimeOff>(
    END_POINTS.HOME_TIME_OFF,
  )
  return response
}
