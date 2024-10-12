import { dataTransform } from "../Pessoas/transform"

export const TEXT_FOR_HOME_PAGE = {
  BIRTHDAY: 'Aniversariantes do mês',
  ABSENT: 'Colaboradores ausentes devido a doença',
  VOCATION: 'Colaboradores em período de férias',
  ACTIVIDADE: 'Actividades',
  TIME_OFF: 'Time OFF',
}

export const ENUN_REQUEST = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
}

export const ENUN_REQUEST_COLOR = {
  PENDING: '#ED8936',
  APPROVED: '#48BB78',
  REJECTED: '#F75A68',
  CANCELLED: '#C3C3C3',
}

export const ENUN_MSG_REQUET = {
  PENDING: 'Deseja fazer alterações a tua Solicitação?',
  APPROVED: 'Deseja Validar a Solicitação Requesitada?',
  REJECTED: 'Deseja Rejeitar a Solicitação Requesitada?',
  CANCELLED: 'Deseja Cancelar a tua Solicitação ?',
}

export function factoryStatus(item: any) {

    if(item.status_manager)
      return ENUN_REQUEST.APPROVED

    if(
      (item.status === ENUN_REQUEST.APPROVED ||
      item.status === ENUN_REQUEST.CANCELLED ||
      item.status === ENUN_REQUEST.REJECTED)
      && item.status_manager !== true
      )
      return item.status 
  
    return ENUN_REQUEST.PENDING

}