import { RequestApi } from '../../utils/request'
import { INotes, INotesInformativeToSave, INotesList } from '../../schema/Notes'
import { INotesClassification } from '../../schema/NotesInformative'

export class NotesService {
  static async getAll() {
    const response = await new RequestApi().get<INotesList[]>('info_notes')
    return response
  }

  static async getAllAndDepto(id: number) {
    const response = await new RequestApi().get<INotesList[]>(
      `info_notes_depto/${id}`,
    )
    return response
  }

  static async getById(id: number) {
    const response = await new RequestApi().get<INotesList | any>(
      `info_notes/${id}`,
    )
    return response.data
  }

  static async saveNote(data: INotesInformativeToSave) {

    console.log('saving notes ... ', data)

    const response = await new RequestApi().post<INotesInformativeToSave>('info_notes', data)
    return response
  
  }

  static async saveTagNote(data: INotesClassification) {
    const response = await new RequestApi().post<any>('notes_tag', data)
    return response
  }

  static async editNote(id: number, data: INotes) {
    const response = await new RequestApi().put<INotes>(
      `update_info_notes/${id}`,
      data,
    )
    return response
  }

  static async updateTagNote(id: number, data: INotesClassification) {
    const response = await new RequestApi().put<INotesClassification>(
      `update_notes_tag/${id}`,
      data,
    )
    return response.response
  }

  static async getAllClassification() {
    const response = await new RequestApi().get<INotesClassification[]>(
      'notes_tag',
    )
    return response.data
  }

  static async removeNote(id: number) {
    const response = await new RequestApi().delete(
      `info_note/${id}`)
    return response
  }

  static async updateNote(id: number, data) {
    const response = await new RequestApi().put<INotesInformativeToSave>(
      `update_info_note/${id}`,
      data,
    )
    return response
  }

}
