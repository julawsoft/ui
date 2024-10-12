import { APIROUTES } from '../../constants/api-routes'
import { RequestApi } from '../../utils/request'

async function getFunctionByOrganogram(organogramId: number): Promise<any> {
  const response = await new RequestApi().get<any[]>(
    APIROUTES.functionByOrganogram + '/' + organogramId,
  )
  return response.data
}

export default getFunctionByOrganogram
