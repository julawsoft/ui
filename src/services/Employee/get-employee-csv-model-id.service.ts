import { APIROUTES } from '../../constants/api-routes'
import { IManager } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getEmployeeCSVModel() {
  const response = await new RequestApi().get<string>(
    APIROUTES.downloadCSVModel,
  )
  return response.data
}

export default getEmployeeCSVModel
