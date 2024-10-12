import { APIROUTES } from '../../constants/api-routes'
import { IManager } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getEmployeeCSVSend(file: any) {
  const response = await new RequestApi().post(
    APIROUTES.downloadCSVSend,{file}
  )
  return response
}

export default getEmployeeCSVSend
