import { RequestApi } from '../../../utils/request'

const rejectDocumentsRequest = async (id: number, data: { notes: string }) => {
  return (
    await new RequestApi().put<any>('reject_document_request/' + id, {
      notes_rejection: data.notes,
    })
  ).data
}

export default rejectDocumentsRequest
