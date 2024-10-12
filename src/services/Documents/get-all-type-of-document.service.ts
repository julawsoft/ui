import { IDocumentType } from '../../schema/Documents'
import { RequestApi } from '../../utils/request'

const getAllTypeOfDocument = async () => {
  return (await new RequestApi().get<IDocumentType[]>('typeDoc')).data
}

export default getAllTypeOfDocument
