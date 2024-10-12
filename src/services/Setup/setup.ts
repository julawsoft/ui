import { RequestApi } from '../../utils/request'

const URL_SETUP = 'setup'

export async function SetupService(data: any) {
  return await new RequestApi().post(`${URL_SETUP}/`, { ...data })
}
