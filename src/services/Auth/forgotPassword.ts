import { RequestApi } from '../../utils/request'

export class ForgotPasswordService {
  static async send(email: string) {
    const response = await new RequestApi().post(`forget_password`, {
      email,
    })

    console.log('forgotpassword Service >>> ', response)

    return response
  }
}
