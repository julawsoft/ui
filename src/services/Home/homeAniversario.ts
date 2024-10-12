import { IHomeCardAniversario } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeCardAniversarioService() {
  const response = await new RequestApi().get<IHomeCardAniversario[]>(
    END_POINTS.HOME_ANIVERSARIO,
  )
  return response
}
