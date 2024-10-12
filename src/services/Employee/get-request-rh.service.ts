import { APIROUTES } from '../../constants/api-routes'
import { IManagerEmployeesAbsence } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getAllRequestByRHService(statusId, departamentId, requestId) {
  const response = await new RequestApi().get<IManagerEmployeesAbsence[]>(
    `${APIROUTES.absenceRH}/${departamentId}/${statusId}/${requestId}`,
  )
  return response.data
}

export default getAllRequestByRHService
