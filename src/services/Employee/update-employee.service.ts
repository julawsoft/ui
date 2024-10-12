import { RequestApi } from '../../utils/request'

export async function updateEmployee(data: any) {
  const response = await new RequestApi().put(`employee`, { ...data })
  return response
}
