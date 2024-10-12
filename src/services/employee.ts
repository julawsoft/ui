import { IEmployee } from '../schema/Employee'
import { RequestApi } from '../utils/request'

export class EmployeeService {
  static async create(data: any) {
    const response = await new RequestApi().post('employee', data)
    return response
  }

  static async getAll() {
    const response = await new RequestApi().get<IEmployee[]>('employees')
    return response.data
  }

  static async getEmployeeByUserAuthenticated(userId: number) {
    const response = await new RequestApi().get<IEmployee[]>(
      `employees_by_manager/${userId}`,
    )

    return response.data
  }
}
