import { IDocumentType } from '../../schema/Documents'
import { RequestApi } from '../../utils/request'

const getAllTypePersonalDocument = async () => {
  return (await new RequestApi().get<IDocumentType[]>('type_document')).data
}

export default getAllTypePersonalDocument
