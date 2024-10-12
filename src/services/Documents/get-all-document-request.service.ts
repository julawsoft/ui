import { RequestApi } from '../../utils/request'

const getAllDocumentsRequests = async () => {
  return (await new RequestApi().get<any[]>('document')).data
}

export default getAllDocumentsRequests
