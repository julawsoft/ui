import { RequestApi } from '../../utils/request'


export interface ITagService {
  id: number
  description: string
}


export class TagsService {
  static async getAll() {
    const response = await new RequestApi().get<ITagService[]>('notes_tag')
    return response
  }
}
