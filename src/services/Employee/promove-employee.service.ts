import { RequestApi } from '../../utils/request'

export async function updateEmployeeService(
  departmentId: any,
  responsibleId: any,
  isPromove: boolean,
) {
  const response = await new RequestApi().put(
    `update_organogram/${departmentId}`,
    {
      responsible_employee_id: responsibleId,
      isPromove,
    },
  )
  return response
}
