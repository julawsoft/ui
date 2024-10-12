import { organizedData } from "../../utils/convertDatas"

interface detailsBio {
    workHour: string,
    extraHour: string,
    mealHours: string,
    workStartHour: string,
    mealStartHour: string,
    mealEndHour: string,
    workEndHour: string,
    items: [
        "2023-02-14",
        [
            {
                action: string,
                code: string,
                description: string,
                date: string
            },
            {
                action: string,
                code: string,
                description: string,
                date: string
            }
        ]
    ]
}

export function transformDataToGraphicUserDashboard(data: any[]): any[] {

    const buildedResult = data.map((item: detailsBio, key: number) => {
        return {
            name: item.items[0],
            Entradas: item.workStartHour && Number(item.workStartHour.replace(':','.')),
            Saidas: item.workEndHour && Number(item.workEndHour.replace(':','.')),
            rest: item
        }
    })

    const result = buildedResult.sort(function(a, b) {
        var dateA = new Date(a.name);
        var dateB = new Date(b.name);
      
        if (dateA < dateB ) {
          return -1;
        }
        if (dateA > dateB ) {
          return 1;
        }
        return 0;
      })

    const orderResult = result.map((item) => {
        let dateTrans = organizedData(item.name)
        return {
            ...item,
            name: dateTrans
        }
    })

    return orderResult
}