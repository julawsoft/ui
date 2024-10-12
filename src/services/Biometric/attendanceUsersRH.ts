import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'
import { transformAttendanceUsersRH } from './transforms'

interface IDataRequest {
  start_date?: string,
  end_date: string,
  categoryId?:number,
  departmentId?:number
}

export async function attendanceUsersRH(data: IDataRequest): Promise<any> {
  const response = await new RequestApi().post<any>(
    END_POINTS.attendanceUsersRH,
    data
    )
  const result = transformAttendanceUsersRH(response.data)
  return result
}
