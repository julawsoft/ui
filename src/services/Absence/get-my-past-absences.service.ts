import { RequestApi } from '../../utils/request'

const getMyPastAbcense = async (id: string) => {
  const response = (await new RequestApi().get<any[]>('employee_absence/' + id))
    .data
  return response.filter((absence) => {
    const diff = new Date(absence.date_end).getTime() - new Date().getTime()
    return diff < 0
  })
}

export default getMyPastAbcense
