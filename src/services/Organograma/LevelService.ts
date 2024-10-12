import { RequestApi } from '../../utils/request'
import { ILevelOrganograma } from '../../schema/LevelOrganograma'

interface CreateNewLevel {
  id?: number
  description: string
  level: number
}

export class LevelService {
  static async getAll() {
    const response = await new RequestApi().get<ILevelOrganograma[]>(
      'level_department',
    )
    return response.data
  }

  static async create(data: CreateNewLevel) {
    const response = await new RequestApi().post('level_department', data)
    return response
  }

  static async update(data: ILevelOrganograma) {
    const response = await new RequestApi().put(
      `update_level_department/${data.id}`,
      data,
    )

    return response.data
  }
}
