import { APIROUTES } from '../../../constants/api-routes'
import { RequestApi } from '../../../utils/request'

export async function aproveAbsenceManagerService(idOrder: number) {
  const response = await new RequestApi().put(
    APIROUTES.absenceAproveManager + '/' + idOrder,
    {},
  )

  return response
}
