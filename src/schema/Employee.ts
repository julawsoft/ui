export interface IEmployee {
  id: number | string
  name: string
  gender: string
  about: string
  birthday: string
  nacionality: string
  organograma_id: number
  photo: string
  status: string
  created_at: string
  updated_at: string
  Organogram: {
    code: string
    description: string
    employee_manager_id: number
  }
  Contract: [
    {
      id: number
      joing_date: string
      employee_number: number
      Role: {
        id: number
        description: string
      }
      Category: {
        id: number
        description: string
      }
    },
  ]
  LineManager: {
    id: number
    employee_id: number
    manager_employee_id: number
    created_at: string
    updated_at: '2024-06-25T12:38:43.642Z'
    Employee: {
      name: string
      Organogram: {
        code: string
        description: string
      }
    }
    Employee_Manager: {
      name: string
      Contract: [
        {
          Role: {
            description: string
          }
        },
      ]
    }
  }
  TokenInvite: {
    id: number
    employee_id: number
    email: string
    token: string
    company_id: number
    is_expired: boolean
    expire_at: string
    is_activated: boolean
    was_invited: boolean
    created_at: string
    updated_at: string
  }
  Contact: {
    id: number
    employee_id: number
    country_id: number
    province_id: number
    email: string
    phone: number
    alternative_phone: number
    address: string
    created_at: string
    updated_at: string
  }
  HomeTime: string,
}

export interface IManager extends IEmployee {
  lineManager: {
    id: number
    name: string
    role: string
  }
}

export interface EmployeeManager {
  id: number
  name: string
  gender: string
  about: string
  birthday: string
  nationality: string
  organograma_id: number
  photo: string
  status: string
  created_at: string
  updated_at: string
  type_document_id: number
  document_number: string
  Organogram: {
    code: string
    description: string
    employee_manager_id: string
  }
  Contract: [
    {
      id: number
      joing_date: string
      employee_number: number
      Role: {
        id: number
        description: string
      }
      Category: {
        id: number
        description: string
      }
    },
  ]
  Contact: {
    id: number
    employee_id: number
    country_id: string
    province_id: string
    email: string
    phone: number
    alternative_phone: string
    address: string
    created_at: string
    updated_at: string
  }
  LineManager: {
    id: number
    name: string
    role: string
  }
  DirectReport: [
    {
      id: number
      employee_id: number
      manager_employee_id: number
      created_at: string
      updated_at: string
      Employee: {
        id: number
        name: string
        Contract: [
          {
            Role: {
              description: string
            }
          },
        ]
      }
    },
  ]
  OrganogramPeers: [
    {
      id: number
      name: string
      gender: string
      about: string
      birthday: string
      nationality: string
      organograma_id: number
      photo: string
      status: string
      created_at: string
      updated_at: string
    },
  ]
}

export interface IManagerEmployeesAbsence {
  id: number
  employee_id: number
  hr_employee_id: number | null
  manager_employee_id: number | null
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
    photo: string
    Contract: [
      {
        is_active: boolean
        Role: {
          id: number
          description: string
        }
      },
    ]
  }

  Manager_Employee: null
  AbsencePeriod: {
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
  }[]
  ReasonAbsence: {
    description: string
    is_manager_required: boolean
    is_attach_required: boolean
    is_extended: boolean
  }
}

interface lideradosByManager {
  id: number
  employee_id: number
  manager_employee_id: number
  created_at: string
  updated_at: string
  Employee: {
    id: number
    name: string
    Contract: [
      {
        Role: {
          description: string
        }
      },
    ]
  }
}

export interface IManagerEmployees {
  manager: {
    id: number
    employee_id: number
    manager_employee_id: number
    created_at: string
    updated_at: string
    Employee: {
      name: string
      Organogram: {
        code: string
        description: string
      }
    }
    Employee_Manager: {
      id: number
      name: string
      Contract: [
        {
          Role: {
            description: string
          }
        },
      ]
    }
  }
  employees: lideradosByManager[]
}
