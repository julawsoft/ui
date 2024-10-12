import { IDepartment } from '../../schema/Department'
import { RequestApi } from '../../utils/request'

export interface CreateDepartment {
  code: string
  description: string
  niveldepto_id: number
  depto_above: number
}

export class DepartmentService {
  static async getAll() {
    const response = await new RequestApi().get<IDepartment[]>('organograms')
    return response.data
  }

  static async create(data: CreateDepartment) {
    const response = await new RequestApi().post('organogram', data)
    return response
  }

  static async update(data: IDepartment) {
    const response = await new RequestApi().put(
      `update_organogram/${data.id}`,
      data,
    )

    return response.data
  }
}
