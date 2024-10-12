import {
  ENUN_REQUEST,
  ENUN_REQUEST_COLOR,
  ENUN_REQUEST_COLOR_TEXT,
} from '../../pages/Home/utils'

export function chooseStatus(status: string) {
  switch (status) {
    case ENUN_REQUEST.APPROVED:
      return ENUN_REQUEST_COLOR.APPROVED
    case ENUN_REQUEST.PENDING:
      return ENUN_REQUEST_COLOR.PENDING
    case ENUN_REQUEST.REJECTED:
      return ENUN_REQUEST_COLOR.REJECTED
    case ENUN_REQUEST.CANCELLED:
      return ENUN_REQUEST_COLOR.CANCELLED
    default:
      return '#26282a'
  }
}

export function chooseStatusColor(status: string) {
  switch (status) {
    case ENUN_REQUEST.APPROVED:
      return ENUN_REQUEST_COLOR_TEXT.APPROVED
    case ENUN_REQUEST.PENDING:
      return ENUN_REQUEST_COLOR_TEXT.PENDING
    case ENUN_REQUEST.REJECTED:
      return ENUN_REQUEST_COLOR_TEXT.REJECTED
    case ENUN_REQUEST.CANCELLED:
      return ENUN_REQUEST_COLOR_TEXT.CANCELLED
    default:
      return '#26282a'
  }
}
