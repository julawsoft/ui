import { RequestApi } from '../../utils/request'


const removeTypePersonalDocument = async (documentId : number) => {
  return (await new RequestApi().delete(`personal_document/${documentId}`))
}

export default removeTypePersonalDocument
