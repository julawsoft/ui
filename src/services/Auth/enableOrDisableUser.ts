import { RequestApi } from '../../utils/request'

export interface IData {
  employeeId: number
  status: number
}

export class EnableOrDisableUserService {
  static async send(data: IData) {
    const response = await new RequestApi().put('disable_employee', data)
    return response
  }
}
