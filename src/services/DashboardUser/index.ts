import { RequestApi } from '../../utils/request'
import { transformDataToGraphicUserDashboard } from './transform';


export class DashboardService {

  static async helpHoursWorkUserLastWeek(email: string) {
    return await new RequestApi().get<any>(`hours_work_user_last_week/${email}`)
  }

  static async weekDays(email: string) {
    const response = await this.helpHoursWorkUserLastWeek(email)
    if(!response.data.length)
        return 0;
    const { workStartHourTotal, ...rest } = response.data
    return workStartHourTotal
  }

  static async pendingSolicitation(id: number) {
    const response = await new RequestApi().get<number>('pending_requests')
    return response.data
  }

  static async dayOff(id: number) {
    const response = await new RequestApi().get<number>(`days_for_vacation/${id}`)
    return response.data
  }

  static async hours_work_user_last_week(email: string) {
    const response = await this.helpHoursWorkUserLastWeek(email)
    if(response.data.length){
      const { details } = response.data
      const result: any[] = transformDataToGraphicUserDashboard(details)
      return result
    }else{
      return []
    }
  }

  static async unjustifiedAbsences(id: number) {
    const response = await new RequestApi().get<any>(`unjustified_absences/${id}`)
    return response.data
  }
}
