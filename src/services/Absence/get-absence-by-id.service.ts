import { RequestApi } from '../../utils/request'

export const getAbcenseById = async (id: number) => {
  const response = (await new RequestApi().get<any[]>('absence/' + id)).data
  return response
}
