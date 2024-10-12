import { RequestApi } from '../../utils/request'
import { INotifications } from '../../schema/Notifications'
import { convertObjectToArray } from '../../utils/convertObjectToArray'

export class NotifictionsService {
  static async getAll() {
    const response = await new RequestApi().get<INotifications[]>(
      'notifications',
    )
    return response.data
  }

  static async getUnReadByEmployeeId(id: number) {
    const response = await new RequestApi().get<INotifications[]>(
      `unread_notification_employee/${id}`,
    )
    return convertObjectToArray(response.data)
  }

  static async getAllByEmployeeId(id: number) {
    const response = await new RequestApi().get<INotifications[]>(
      `all_notifications/${id}`,
    )
    return convertObjectToArray(response.data)
  }

  static async updateByStatusNotificationsEmployee(employeeId, id) {
    const response = await new RequestApi().put<INotifications>(
      `change_status_notifications_employee/${id}`,
      {
        employee_id: employeeId,
      },
    )
    return response.data
  }
}
