import { IHomeCardSaude } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeCardSaudeService() {
  const response = await new RequestApi().get<IHomeCardSaude[]>(
    END_POINTS.HOME_SAUDE,
  )
  return response
}
