import { RequestApi } from '../../utils/request'
import { APIROUTES } from '../../constants/api-routes'

export interface ICreateEmployee {
  name: string
  email: string
  gender: number
  phone: string
  function_id: number
  category_id: number
  organograma_id: number
  employee_number: number
  identification_type: number
  identification_number: number
  date_of_birth: Date
  joining_date: Date
  periodicity_id: number
  type_contract_id: number
}

export async function createEmployee(data: Pick<ICreateEmployee, 'email'>) {
  const response = await new RequestApi().post(APIROUTES.employeeInvite, data)
  return response
}
