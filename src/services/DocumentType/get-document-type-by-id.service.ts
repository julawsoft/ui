import { IDocumentType } from '../../schema/Documents'
import { RequestApi } from '../../utils/request'

const getTypeOfDocumentById = async (id: number) => {
  return await new RequestApi().get<IDocumentType>('typeDoc/' + id)
}

export default getTypeOfDocumentById
