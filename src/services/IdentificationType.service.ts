import { RequestApi } from '../utils/request'

export interface IIdentificationTypeProps {
  id: number
  description: string
}

export async function getIdentificationsType() {
  const response = await new RequestApi().get<IIdentificationTypeProps[]>(
    'type_document',
  )
  return response.data
}
