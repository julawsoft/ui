export interface IDepartment {
  id: number
  code: string
  description: string
  niveldepto_id: number
  depto_above?: number
  responsible_employee_id?: number
  created_at?: Date
  updated_at?: Date
  status: number
}
