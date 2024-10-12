import { RequestApi } from '../../utils/request'
import { APIROUTES } from '../../constants/api-routes'

export async function updateLineManager(
  lineManagerId: number,
  employeeId: number,
  id?: number | null,
) {
  const response = await new RequestApi().post(APIROUTES.manager, {
    manager_employee_id: lineManagerId,
    employee_id: employeeId,
    id,
  })
  return response
}
