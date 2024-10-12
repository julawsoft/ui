import { IUserLogged } from '../../pages/Login/utils'
import { RequestApi } from '../../utils/request'

interface ILogin {
  email: string
  password: string
}

export async function LoginService(data: ILogin) {
  const response = await new RequestApi().post<IUserLogged>(`login`, { data })
  return response
}
