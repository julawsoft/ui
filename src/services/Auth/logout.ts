import { RequestApi } from '../../utils/request'

export async function LogoutService() {
  const response = await new RequestApi().post(`logout`, {})
  return response
}
