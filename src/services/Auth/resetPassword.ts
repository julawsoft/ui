import { RequestApi } from '../../utils/request'

export interface IData {
  password: string
  token: any
}

export interface IDataResetPassword {
  newPassword: string
  repetedPassword: string
}

export class ResetPasswordService {
  static async send(data: IData) {
    const response = await new RequestApi().post('reset_password', data)
    return response
  }

  static async resetPassword(data: IDataResetPassword) {
    const response = await new RequestApi().post('reset_password_user', data)
    return response
  }
}
