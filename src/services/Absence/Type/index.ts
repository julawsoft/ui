import { RequestApi } from '../../../utils/request'

export interface IAbsenceType {
  id: number
  description: string
}

export function findTypeOfAbsence(
  types: IAbsenceType[],
  id: number,
): string | null {
  const filtered = types.filter((type) => {
    return type.id === id
  })
  if (filtered.length === 0) return null

  return filtered[0].description
}

const getAllAbsenceTypes = async (): Promise<IAbsenceType[]> => {
  const response = (await new RequestApi().get<any[]>('reasons_absences')).data
  return response
}

export default getAllAbsenceTypes
