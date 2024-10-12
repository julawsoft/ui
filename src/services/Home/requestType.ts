import { IRequestType, IRequestTypeDTO } from '../../schema/HomeCard'
import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

function transformData(data: IRequestTypeDTO[]): IRequestType[] {
  return (
    data &&
    data.map((item: IRequestTypeDTO) => {
      return {
        id: item.id,
        description: item.description,
        flag: item.flag,
        anexoRequired: item.is_attach_required,
        shIsRequired: item.is_manager_required,
        isExtended: item.is_extended,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }
    })
  )
}

export async function requestTypesService(): Promise<IRequestType[]> {
  const response = await new RequestApi().get<IRequestTypeDTO[]>(
    END_POINTS.HOME_TYPE_REQUEST,
  )
  return transformData(response.data)
}
