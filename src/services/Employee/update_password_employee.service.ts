import { RequestApi } from '../../utils/request'

export async function updatePasswordEmployeeService(data: {
  oldPassword: string
  newPassword: string
}) {
  const response = await new RequestApi().post(`change_password`, {
    ...data,
  })

  return response
}
