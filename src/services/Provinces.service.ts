import { IProvince } from '../schema/Province'
import { RequestApi } from '../utils/request'

export async function getProvinces() {
  const response = await new RequestApi().get<IProvince[]>('provinces')
  return response.data
}
