import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

interface IDataRequest {
  email: string,
  start_date?: string,
  end_date: string
}

export async function attendanceUserEmail(data: IDataRequest): Promise<any> {
  const response = await new RequestApi().post<any>(
    END_POINTS.attendanceUserEmail,
    data
    )
  return {
     range: response.data.range,
     details: response.data.info_biometrico.details
  }
}
