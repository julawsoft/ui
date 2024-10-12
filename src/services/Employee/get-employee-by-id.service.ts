import { APIROUTES } from '../../constants/api-routes'
import { Category } from '../../constants/entities/category'
import { Employee } from '../../constants/entities/employee'
import { Funcction } from '../../constants/entities/function'
import { IdentificationType } from '../../constants/entities/identification-type'
import { Organograma } from '../../constants/entities/organograma'
import { Province } from '../../constants/entities/province'
// import { IEmployee } from '../../schema/Employee'
import { RequestApi } from '../../utils/request'

export interface EmployDTO {
  [Employee.id]: number
  [Employee.name]: string
  [Employee.email]: string
  [Employee.about]: string
  [Employee.address]: string
  [Employee.category]: {
    [Category.name]: string
  }
  [Employee.categoryId]: number
  [Employee.country]: string
  [Employee.createAd]: string
  [Employee.dateOfBirth]: string
  [Employee.employeeNumber]: number
  [Employee.function]: {
    [Funcction.name]: string
  }
  [Employee.functionId]: number
  [Employee.gender]: string
  [Employee.identificationNumber]: string
  [Employee.identificationType]: {
    [IdentificationType.id]: number
    [IdentificationType.description]: string
    [IdentificationType.name]: string
    [IdentificationType.status]: string | number
  }
  [Employee.joiningDate]: string
  [Employee.nacionality]: string
  [Employee.organograma]: {
    [Organograma.code]: string
    [Organograma.description]: string
  }
  [Employee.organogramaId]: number
  [Employee.phone]: string
  [Employee.phoneAlt]: string
  [Employee.province]: {
    [Province.name]: string
    [Province.description]: string
  }
  [Employee.provinceId]: number
  [Employee.status]: string | number
  [Employee.updatedAt]: string
  [Employee.userId]: string
  [Employee.periodicity]: string
  [Employee.typeContract]: string | number
  [Employee.image]: string
  [Employee.contract]?: string
}

export type IEmployee = {
  id: 1
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
      joing_date: string
      Role: {
        description: string
      }
    },
  ]
}

async function getEmployeeById(id: number) {
  const response = await new RequestApi().get<IEmployee>(
    APIROUTES.employee + '/' + id,
  )
  return response
}

export default getEmployeeById
