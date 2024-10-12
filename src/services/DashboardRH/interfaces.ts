export interface IEmployeeContract {
  id: number
  name: string
  data: string
}
export interface IEmployeesByCategory {
  id: number
  name: string
  description: string
  status: number
  totalEmployees: number
}
export interface IEmployeesByDepartment {
  id: number
  code: string
  description: string
  status: number
  totalEmployees: number
  TotalEmployees: number
}

export interface ILatestRequestedAbsences {
  id: number
  Employee: {
    id: number
    name: string
  }
  attach: any
  created_at: string
  date_end: string
  date_start: string
  employee_id: number
  hr_manager: number
  notes: any
  notes_rejection: string
  number_of_days: number
  reason: string
  status: 3
  status_manager: number
  type: number
  updated_at: string
}

export interface IIndexAssiduity {
  AssíduousEmployees: number
  nonAttendanceEmployees: number
}
