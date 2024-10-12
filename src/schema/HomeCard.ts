export interface IHomeCardSaude {
  id: number
  employee_id: number
  hr_employee_id: string
  manager_employee_id: string
  reason_absence_id: number
  period_absence_id: number
  date_start: string
  date_end: string
  number_of_days: 1
  descrption: string
  attach: string
  notes: string
  notes_rejection: string
  status_manager: boolean
  status: string
  created_at: string
  updated_at: string
  Employee: {
    name: string
  }
  ReasonAbsence: {
    description: string
  }
  AbsencePeriod: {
    description: string
  }
}

export interface IHomeCardAniversario {
  id: number
  name: string
  gender: string
  about: string
  birthday: string
  nacionality: null
  organograma_id: number
  photo: string
  status: string
  created_at: string
  updated_at: string
}

export interface IHomeCardFerias {
  id: number
  employee_id: number
  hr_employee_id: string
  manager_employee_id: string
  reason_absence_id: number
  period_absence_id: number
  date_start: string
  date_end: string
  number_of_days: 1
  descrption: string
  attach: string
  notes: string
  notes_rejection: string
  status_manager: boolean
  status: string
  created_at: string
  updated_at: string
  Employee: {
    name: string
  }
  ReasonAbsence: {
    description: string
  }
  AbsencePeriod: {
    description: string
  }
}

export interface IHomeCardOther {
  user_name: string
  date: string
  days?: string
  created_at?: string
}

export interface IHomeCardActivity {
  id: number
  employee_id: number
  information: string
  created_at: string
  updated_at: string
}

export interface IHomeCardRequest {
  userName: string
  date: string
  status: string
  duration: string
  typeRequest: string
}

export interface IHomeTimeOff {
  approved: number
  pending: number
  remaining: number
  startDate: string
  endDate: string
  totalAllowance: number
}

export interface IRequestType {
  id: number
  description: string
  flag: string
  anexoRequired: boolean
  shIsRequired: boolean
  isExtended: boolean
  created_at: string
  updated_at: string
}

export interface IRequestTypeDTO {
  id: number
  description: string
  flag: string
  is_attach_required: boolean
  is_manager_required: boolean
  is_extended: boolean
  created_at: string
  updated_at: string
}

export interface IRequest {
  employee_id: number
  reason_absence_id: number
  date_start: string
  date_end: string
  is_afternoon?: boolean
  is_half_day: boolean
  is_longer: boolean
  is_longer_extended: boolean
  is_morning: boolean
  is_one_day: boolean
  text: string
  notes: string
  attach?: string
}

export interface ITimeOff {
  pending: number
  approved: number
  rejected: number
  timeOff: string
  allowedDays: string
  remainder: string
}

export interface IFeedBack {
  id: number
  operation_id: number
  employee_id: number
  is_manager: boolean
  is_rejection: boolean
  feedback: string
  notification_type: string
  created_at: string
  updated_at: string
  Employee: {
    name: string
  }
}

export interface IHomeCardRequestPendente {
  id: number
  employee_id: number
  hr_employee_id: number
  manager_employee_id: number
  reason_absence_id: number
  date_start: string
  date_end: string
  number_of_days: number
  descrption: string
  attach: string
  notes: string
  notes_rejection: string
  status_manager: boolean
  status: string
  created_at: string
  updated_at: string
  Employee: {
    name: string
  }
  ReasonAbsence: {
    description: string
  }
}

export interface IHomeCardRequestById {
  id: number
  employee_id: number
  hr_employee_id: number
  manager_employee_id: number
  reason_absence_id: number
  date_start: string
  date_end: string
  number_of_days: number
  descrption: string
  attach: string
  notes: string
  notes_rejection: string
  status_manager: string
  status: string
  created_at: string
  updated_at: string
  Employee: {
    name: string
    Contract: [
      {
        Role: {
          description: string
        }
      },
    ]
  }
  ReasonAbsence: {
    description: string
    is_manager_required: boolean
  }
  Manager_Employee: {
    name: string
  }
  AbsencePeriod: [
    {
      id: number
      absence_id: number
      is_afternoon: boolean
      is_half_day: boolean
      is_longer: boolean
      is_longer_extended: boolean
      is_morning: boolean
      is_one_day: boolean
      text: string
      created_at: string
      updated_at: string
    },
  ]
  feedback: IFeedBack[]
}


export interface IDocumentRequest {
  employee_id: number,
  type_solicitation_doc_id: number,
  description: string
}

export interface IDocumentDTORequest {
  id: number,
  description: string,
  attach: string | undefined,
  notes: string | undefined,
  notes_rejection: string | undefined,
  type_solicitation_doc_id: number,
  employee_id: number,
  hr_employee_id: string | undefined,
  status: string,
  created_at: string,
  updated_at: string,
  Type_Solicitation_Doc: {
    id: number,
    description: string
  },
  Employee: {
    id: number,
    name: string
  },
  Rh_Employee: {
    id: number,
    name: string
  }
}

