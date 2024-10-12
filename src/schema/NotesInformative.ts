import { INotesList } from './Notes'
export interface INotesClassification {
  tag: string
  status?: number
  InofrmativeNote?: INotesList[]
  employee_id?: number
  created_at?: string
  updated_at?: string
  id?: number
  option?: any
}
