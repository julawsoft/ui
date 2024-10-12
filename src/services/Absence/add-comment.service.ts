import { RequestApi } from '../../utils/request'

interface IAddComment {
  idOrder: number
  employee_id: number
  comment: string
}

export const addCommentAbsenceRequest = (data: IAddComment) => {
  return new RequestApi().post<any>(
    'comments',
    { ...data, flag: 'absence' },
    false,
  )
}
