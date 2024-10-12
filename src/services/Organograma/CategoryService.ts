import { RequestApi } from '../../utils/request'
import { ICategory } from '../../schema/Category'

export interface CreateNewCategory {
  name: string
  description: string
}

export class CategoryService {
  static async getAll() {
    const response = await new RequestApi().get<ICategory[]>('categories')
    return response.data
  }

  static async create(data: CreateNewCategory) {
    const response = await new RequestApi().post('category', data)
    return response
  }

  static async update(data: ICategory) {
    const response = await new RequestApi().put(
      `update_category/${data.id}`,
      data,
    )

    return response.data
  }
}
