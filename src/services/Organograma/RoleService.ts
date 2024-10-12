import { IRole } from '../../schema/Role'
import { RequestApi } from '../../utils/request'

interface CreateNewRole {
  name: string
  description: string
}

export class RoleService {
  static async getAll() {
    const response = await new RequestApi().get<IRole[]>('roles')
    return response.data
  }

  static async create(data: CreateNewRole) {
    const response = await new RequestApi().post('function', data)
    return response
  }

  static async update(data: IRole) {
    const response = await new RequestApi().put(
      `update_function/${data.id}`,
      data,
    )
    return response
  }
}
