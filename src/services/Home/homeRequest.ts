import { ENUN_REQUEST } from '../../pages/Home/utils'
import {
  IDocumentDTORequest,
  IHomeCardRequestById,
  IHomeCardRequestPendente,
  IRequest,
} from '../../schema/HomeCard'
import { INotesList } from '../../schema/Notes'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function homeCardRequestService(userId: number) {
  const response = await new RequestApi().get<IHomeCardRequestPendente[]>(
    `${END_POINTS.HOME_REQUEST_PENDENTE}/${userId}`,
  )
  return response
}

export async function homeCardRequestByIdService(idRequest: number) {
  const response = await new RequestApi().get<IHomeCardRequestById>(
    `${END_POINTS.HOME_REQUEST_PENDENTE_BY_ID}/${idRequest}`,
  )
  return response
}

export async function homeCardRequestCancelService(
  idRequest: number,
  userId: number,
  status: string,
) {
  const response = await new RequestApi().put<IHomeCardRequestPendente>(
    `${END_POINTS.HOME_REQUEST_CANCEL}/${idRequest}`,
    { status },
  )
  return response
}

export async function homeCardRequestChangeStatusService(
  idRequest: number,
  employeeId: number,
  status: string,
  feedback: string,
) {
  const response = await new RequestApi().put<IHomeCardRequestPendente>(
    `${END_POINTS.HOME_REQUEST_CHANGE_STATUS}/${idRequest}`,
    { hr_employee_id: employeeId, status, feedback },
  )
  return response
}

export async function homeCardRequestChangeStatusServiceSH(
  idRequest: number,
  employeeId: number,
  status: string,
  feedback: string,
) {

  const statusSave = status === ENUN_REQUEST.APPROVED
  const response = await new RequestApi().put<IHomeCardRequestPendente>(
    `${END_POINTS.HOME_REQUEST_CHANGE_STATUS_SH}/${idRequest}`,
    { manager_employee_id: employeeId, status_manager: statusSave, feedback },
  )
  return response
}

export async function requestReview(idRequest: number, userId: number) {
  const response = await new RequestApi().post<IHomeCardRequestById>(
    `${END_POINTS.REQUEST_REVIEW}/`,
    { request_id: idRequest, user_id: userId },
  )
  return response
}

export async function homeCardRequestInfoNotes() {
  const response = await new RequestApi().get<INotesList[]>(
    `${END_POINTS.INFO_NOTES}`,
  )
  return response
}

export async function homeCardRequestInfoNotesById(infoNoteId: number) {
  const response = await new RequestApi().get<INotesList>(
    `${END_POINTS.INFO_NOTE}/${infoNoteId}`,
  )
  return response
}

export async function homeCardRequestUpdateService(
  idRequest: number,
  data: IRequest,
) {
  console.log('homeCardRequestChange Edit By User', idRequest, data)
  const response = await new RequestApi().put<IHomeCardRequestPendente>(
    `${END_POINTS.HOME_REQUEST_CHANCE}/${idRequest}`,
    { data },
  )
  return response
}

// REQUEST LEADER
export async function cardRequestUserStatus(userId: number, status: string) {
  const response = await new RequestApi().put<IHomeCardRequestPendente>(
    `${END_POINTS.HOME_REQUEST_EMPLOYEE_STATUS}/${userId}`,
    { status },
  )
  return response
}

export async function homeCardRequestDocumentByIdService(idUser: number, limit?: number, status = "PENDING") {
  const response = await new RequestApi().get<IDocumentDTORequest[]>(
    `${END_POINTS.HOME_REQUEST_DOCUMENT_PENDENTE_BY_ID}/${idUser}/${limit}/${status}`,
  )
  return response
}

export async function homeCardRequestDocumentService(limit: number, status: string) {
  const response = await new RequestApi().get<IDocumentDTORequest[]>(
    `${END_POINTS.DOCUMENT_REQUEST}/${limit}/${status}`,
  )
  return response
}


export async function homeCardRequestDocumentDeleteService(id: number) {
  const response = await new RequestApi().delete(
    `${END_POINTS.HOME_DOCUMENT_REQUEST}/${id}`,
  )
  console.log(" response homeCardRequestDocumentDeleteService >>> ",response )
  return response
}

