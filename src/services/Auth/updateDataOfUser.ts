import { RequestApi } from '../../utils/request'

export async function getDataOfUserLogged() {
  const response = await new RequestApi().get('me')
  return response
}
