import { IDocumentRequest, IRequest } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeModalRequestService(data: IRequest) {
  const response = await new RequestApi().post(END_POINTS.HOME_REQUEST, data)
  return response
}

export async function homeModalDocumentRequestService(data: IDocumentRequest) {
  return await new RequestApi().post(END_POINTS.HOME_DOCUMENT_REQUEST, data)
}

export async function homeModalDocumentRequestEditService(data: IDocumentRequest, id: number) {
  return await new RequestApi().put(`${END_POINTS.HOME_DOCUMENT_REQUEST}/${id}`, data)
}


export async function homeUpdateDocumentRequestService(id: number, attach: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
  return await new RequestApi().put(`${END_POINTS.HOME_DOCUMENT_REQUEST}/${id}`, {attach: attach, status: status, notes_rejection: notes})
}


