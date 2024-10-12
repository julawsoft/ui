export interface IDetailsBio {
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


export interface IDetailsBioRH {
    name: string,
    employee_number:number,
    info_biometrico:{
        workStartHourTotal: string
    }
    Organograma: {
        code: string,
    },
    Category: {
        name:string
    }

}
