import { RequestApi } from '../utils/request'

export class FunctionService {
  static async create(role: any) {
    const response = await new RequestApi().post('/function', role)
    return response
  }

  static async getAll() {
    const response = await new RequestApi().get<any[]>(`/function`)
    return response.data
  }
}
