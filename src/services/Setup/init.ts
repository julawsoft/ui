import { RequestApi } from '../../utils/request'

const URL_INIT = 'init'
export interface IInit {
  employee_name: string
  employee_birthday: string
  email: string
  address: string
  company_name: string
  bank_name: string
  account_number: number
  account_iban: string
  social_assurence: number
  document: string
  is_activated: boolean
}

export async function InitService(token: string) {
  return await new RequestApi().get<IInit>(`${URL_INIT}/${token}`)
}
