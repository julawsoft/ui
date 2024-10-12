import { IEmployee } from './Employee'

export interface INotifications {
  id: number
  depto_id: number
  description: string
  employee_id: number
  hr_status: number
  flag: string
  icon: string
  manager_status: number
  employee_status: number
  type: number
  updated_at: string
  url: string
  created_at: string
  operation_id: number
  Employee: IEmployee
  status?: number
  notificationId?: number
}

export interface INotificationsByEmployee {
  id: number
}
