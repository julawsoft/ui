import { IHomeCardFerias } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeCardFeriasService() {
  const response = await new RequestApi().get<IHomeCardFerias[]>(
    END_POINTS.HOME_FERIAS,
  )
  return response
}
