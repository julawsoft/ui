import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'
import { IIndexAssiduity } from './interfaces'

export async function getIndexAssiduity(): Promise<IIndexAssiduity> {
  const response = await new RequestApi().get<IIndexAssiduity>(
    END_POINTS.indexAssiduity,
  )
  return response.data
}
