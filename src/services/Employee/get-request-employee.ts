import { APIROUTES } from '../../constants/api-routes'
import { IManagerEmployeesAbsence } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

async function getAllRequestByEmployeeService(employeeId, status = "PENDING") {
  const response = await new RequestApi().get<IManagerEmployeesAbsence[]>(
    `${APIROUTES.employeeRequests}/${employeeId}/${status}`,
  )
  return response.data
}

export default getAllRequestByEmployeeService
