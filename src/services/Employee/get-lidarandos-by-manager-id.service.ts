import { APIROUTES } from '../../constants/api-routes'
import { IManagerEmployees } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getLideradosByManagerService() {
  const response = await new RequestApi().get<IManagerEmployees>(
    APIROUTES.liderandoByManager,
  )
  return response.data
}

export default getLideradosByManagerService
