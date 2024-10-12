export interface IUserLogged {
  accessToken: string
  refreshToken: string
  userInfo: {
    sub: string
    email_verified: boolean
    groups: string[]
  }
  groups: [
    {
      id: string
      name: string
      path: string
    },
  ]
  roles: [
    {
      id: string
      name: string
      description: string
      composite: boolean
      clientRole: boolean
      containerId: string
    },
  ]
  employee: {
    id: number
    employee_id: number
    email: string
    user_id: string
    created_at: string
    updated_at: string
    Employee: {
      name: string
      gender: string
      photo: string
      Contract: [
        {
          Role: {
            id: number
            description: string
          }
        },
      ]
    }
  }
}

/* 
"accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmTF9ZWmFDQmVyM2FqMjliamttTUdIR181UGs1d0hDYmZtZ0h5Y0FYYWJ3In0.eyJleHAiOjE3MTc0Mjk0NjQsImlhdCI6MTcxNzQyNzk2NCwianRpIjoiYWU3MjM0NzEtYzE3NS00NWJhLWFhODEtZTMzMjIxYjU4ZjdhIiwiaXNzIjoiaHR0cHM6Ly8xOTIuMTY4LjIwLjU0L2F1dGgvcmVhbG1zL0NldGltIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImMyYzJiZGM4LWYyNDEtNDEyYS04N2JkLTFiM2QyZGNmYmY5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNvbGFiIiwic2Vzc2lvbl9zdGF0ZSI6ImRkMTdkZjkwLTY1NzItNDM5ZS05OTNhLWExZDY2MDEwNmY2NCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWNldGltIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJjb2xhYiI6eyJyb2xlcyI6WyJWYWxpZGEgc29saWNpdGHDp8OjbyBkbyBDb2xhYm9yYWRvciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZGQxN2RmOTAtNjU3Mi00MzllLTk5M2EtYTFkNjYwMTA2ZjY0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJncm91cHMiOlsiL2NvbGFiIl0sInByZWZlcnJlZF91c2VybmFtZSI6ImNvbGFiQGNldGltLm1zIn0.a2QC4m7o_-BQ2XQgz1K9DlTLOqZt5lx_28vnyS9LbgA1EDVCpEwtiztgQZiAdfjd2e0IxujUCgBcVv6D_N6t_Eh9qoMIrberWgdPJgIS63QzmNEgECLkyUlpnNVT8GDzA-VkYGzsASRwQb1gnKud22QrVVOSsqKFlC3_BK7rLRUULK-FG_oI6CKqdqdwjVgFBMY2SzgOCBT1btaUjHkomxmpf15rTik_CpsljnDpqsjreCDwG4KTVdVHQDfYI4onEFZEYGPHY9gXSoggvAn5eNjaL1Fd-5BlRix6xxl3NjtB2IKcFJu2kAuQy5B1EwPNHys70P9RGjYwR-ZHEeUrsA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3N2I3YmI2Zi1mYjgzLTRlZmEtYmQ2Yi1jNmFlZDZiNjIyM2MifQ.eyJleHAiOjE3MTc0Mjk3NjQsImlhdCI6MTcxNzQyNzk2NCwianRpIjoiNWMwMmY2MWItZDhmZC00MWRlLTlkMmUtZTM0YjFmNDhmNmZlIiwiaXNzIjoiaHR0cHM6Ly8xOTIuMTY4LjIwLjU0L2F1dGgvcmVhbG1zL0NldGltIiwiYXVkIjoiaHR0cHM6Ly8xOTIuMTY4LjIwLjU0L2F1dGgvcmVhbG1zL0NldGltIiwic3ViIjoiYzJjMmJkYzgtZjI0MS00MTJhLTg3YmQtMWIzZDJkY2ZiZjkwIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImNvbGFiIiwic2Vzc2lvbl9zdGF0ZSI6ImRkMTdkZjkwLTY1NzItNDM5ZS05OTNhLWExZDY2MDEwNmY2NCIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImRkMTdkZjkwLTY1NzItNDM5ZS05OTNhLWExZDY2MDEwNmY2NCJ9.b1bY2S9A7yxHEw1FGEUYWAf0mZtKYdV8tKyoCAuFUns",
        "userInfo": {
            "sub": "c2c2bdc8-f241-412a-87bd-1b3d2dcfbf90",
            "email_verified": false,
            "groups": [
                "/colab"
            ],
            "preferred_username": "colab@cetim.ms"
        },
        "groups": [
            {
                "id": "9ab899ac-a546-4675-b8ca-5c8a5084f419",
                "name": "colab",
                "path": "/colab"
            }
        ],
        "roles": [
            {
                "id": "fe78c859-40d0-46bb-a384-8d331e44d01b",
                "name": "Valida solicitação do Colaborador",
                "description": "Valida solicitação do Colaborador",
                "composite": false,
                "clientRole": true,
                "containerId": "ed480451-4e62-4a2e-8e02-4926317c18e1"
            }
        ],
        "employee": {
            "id": 1,
            "employee_id": 1,
            "email": "colab@cetim.ms",
            "user_id": "c2c2bdc8-f241-412a-87bd-1b3d2dcfbf90",
            "created_at": "2024-06-03T11:45:53.333Z",
            "updated_at": "2024-06-03T11:45:53.333Z",
            "Employee": {
                "name": "Adão Felipe",
                "gender": "Masculino",
                "Contract": [
                    {
                        "Role": {
                            "id": 1,
                            "description": "Sênior Software Developer"
                        }
                    }
                ]
            }
        }

*/
