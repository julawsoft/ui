import { ROUTES } from '../../../routes/constants'
import { RequestApi } from '../../../utils/request'

export const getAllCompanyFiles = async () => {
  return (await new RequestApi().get<any[]>(ROUTES.CompanyFiles)).data
}
