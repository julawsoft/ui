import { IDetailsBio, IDetailsBioRH } from '../../schema/Biometric';
import { organizedData } from '../../utils/convertDatas';


export function transformAttendanceUserByEmail(data: IDetailsBio[]) {
  return data && data.length
    ? data.map((item: IDetailsBio, key: number) => {
      return {
        id: key + 1,
        data: organizedData(item.items[0]),
        workstarthour: item.workStartHour,
        mealstarthour: item.mealStartHour,
        mealendhour: item.mealEndHour,
        workendhour: item.workEndHour,
        workhour: item.workHour,
        mealhours: item.mealHours,
        extrahour: item.extraHour
      }
    })
    : []
}

export function transformAttendanceUsersRH(data: IDetailsBioRH[]) {
  return data && data.length
    ? data.map((item: IDetailsBioRH, key: number) => {
      return {
        id: key + 1,
        colab: item.name,
        workstarthourtotal: item.info_biometrico?.workStartHourTotal,
        category: item.Category?.name,
        department: item.Organograma?.code,
        employee_number: item.employee_number
      }
    })
    : []
}