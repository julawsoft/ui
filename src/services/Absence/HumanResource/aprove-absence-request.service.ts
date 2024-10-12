import { APIROUTES } from '../../../constants/api-routes'
import { RequestApi } from '../../../utils/request'

export async function aproveAbsenceHumanResourceService(idOrder: number) {
  const response = await new RequestApi().put(
    APIROUTES.absenceAproveHr + '/' + idOrder,
    {},
  )

  return response
}
