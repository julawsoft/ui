import { IDepartment } from './Department'

export interface IIndicator {
  id: number
  id_department: number
  description: string
  reference: string
  Department: IDepartment
  created_at: string
  updated_at: string
}
