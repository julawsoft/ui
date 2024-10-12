import { GroupsPermissions } from "../groups"

const PATHS = {
  mobility: 'mobilidade',
  document: 'document',
  document_details: 'document_details',
  absence: 'absence',
}

export function switchPathDetails(path: string, groupUser) {
  switch (path) {
    case PATHS.mobility:
      return '/requests/mobility'
    case PATHS.document:
      if (groupUser !== GroupsPermissions.COLAB) return '/requests/document'
      else return '/docs/detail'
    case PATHS.document_details:
      return '/docs/detail'
    case PATHS.absence:
      return '/requests/absence'
    default:
      return '/notifications'
  }
}

const FLAGS = {
  mobility: 'mobilidade',
  document: 'document',
  document_details: 'document_details',
  absence: 'absence',
  comment: 'comment',
}

export function switchFlagItemNotify(url: string) {
  switch (url) {
    case FLAGS.document:
      return 'documento'
    case FLAGS.document_details:
      return 'documento enviado'
    case FLAGS.mobility:
      return 'mobilidade'
    case FLAGS.absence:
      return 'férias'
    case FLAGS.comment:
      return 'comentário'
    default:
      return 'notificação'
  }
}
