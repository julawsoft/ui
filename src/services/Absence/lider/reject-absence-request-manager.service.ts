import { APIROUTES } from '../../../constants/api-routes'
import { RequestApi } from '../../../utils/request'

export const rejectAbsenceRequestManager = async (
  id: number,
  notes: string,
) => {
  return (
    await new RequestApi().put<any>(APIROUTES.absenceRejectManager + '/' + id, {
      notes_rejection: notes,
    })
  ).data
}
