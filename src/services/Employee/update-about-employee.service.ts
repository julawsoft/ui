import { RequestApi } from '../../utils/request'

export async function updateAboutEmployee(data: { about: string; id: number }) {
  const response = await new RequestApi().put(`employees/${data.id}`, {
    about: data.about,
  })
  return response
}
