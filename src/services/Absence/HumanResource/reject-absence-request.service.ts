import { APIROUTES } from '../../../constants/api-routes'
import { RequestApi } from '../../../utils/request'

export async function rejectAbsenceHumanResourceService(
  idOrder: number,
  notesRejection: string,
) {
  const response = await new RequestApi().put(
    APIROUTES.absenceRejectHr + '/' + idOrder,
    { notes_rejection: notesRejection },
  )

  return response
}
