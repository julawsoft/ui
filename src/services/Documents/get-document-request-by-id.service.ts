import { RequestApi } from '../../utils/request'

const getDocumentsRequestById = async (id: number) => {
  return (await new RequestApi().get<any>('document/' + id)).data
}

export default getDocumentsRequestById
