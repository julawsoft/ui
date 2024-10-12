import { APIROUTES } from '../../constants/api-routes'
import { IManagerEmployeesAbsence } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getLideradosRequestPendenteByManagerService(userId: number) {
  const response = await new RequestApi().get<IManagerEmployeesAbsence[]>(
    `${APIROUTES.liderandoRequestPendenteByManager}/${userId}`,
  )
  return response.data
}

export default getLideradosRequestPendenteByManagerService
