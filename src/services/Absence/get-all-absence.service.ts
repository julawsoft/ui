import { RequestApi } from '../../utils/request'

export const getAllAbcense = async () => {
  const response = (await new RequestApi().get<any[]>('absences')).data
  return response
}
