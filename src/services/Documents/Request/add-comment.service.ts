import { RequestApi } from '../../../utils/request'

interface IAddComment {
  idOrder: number
  employee_id: number
  comment: string
}

const addCommentDocumentRequest = (data: IAddComment) => {
  return new RequestApi().post<any>(
    'comments',
    { ...data, flag: 'document' },
    false,
  )
}

export default addCommentDocumentRequest
