import { APIROUTES } from '../../constants/api-routes'
import { IManagerEmployeesAbsence } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getLideradosRequestByManagerService() {
  const response = await new RequestApi().get<IManagerEmployeesAbsence[]>(
    APIROUTES.liderandoRequestByManager,
  )
  return response.data
}

export default getLideradosRequestByManagerService
