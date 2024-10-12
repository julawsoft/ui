import { ENUN_REQUEST } from "../../pages/Home/utils"

interface ITranslate {
    origin: string
    translate: string
}

const TRANSLATE: ITranslate[] = [
    {
        origin: ENUN_REQUEST.APPROVED,
        translate: 'Aprovado'
    },
    {
        origin: ENUN_REQUEST.CANCELLED,
        translate: 'Cancelado'
    },
    {
        origin: ENUN_REQUEST.PENDING,
        translate: 'Pendente'
    }, 
    {
        origin: ENUN_REQUEST.REJECTED,
        translate: 'Rejeitado'
    },
    
]


export function translate(value: string): string {
    let valueFinded: string = ''
    for (let item of TRANSLATE) {
        if(item.origin === value) {
            valueFinded = item.translate 
            break
        } else {
            valueFinded  = value
        }
    }
    return valueFinded
}
