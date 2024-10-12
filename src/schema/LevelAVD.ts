export interface ILevelAVD {
  id: number
  level: number
  description: string
  status: 1 | 0
  create_at?: string | Date
  update_at?: string | Date
}
