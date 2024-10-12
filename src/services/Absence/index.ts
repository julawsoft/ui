import { RequestApi } from '../../utils/request'

export interface ICreateAbsence {
  date_start: string
  date_end: string
  number_of_days: number
  reason: string
  employee_id: number
  type: number
  reason_absence_id: number
}
const createAbsence = (data: ICreateAbsence) => {
  return new RequestApi().post('absence', data)
}

export default createAbsence
