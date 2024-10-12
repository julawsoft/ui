import { Bed, Cake, ShoppingBagOpen, User } from 'phosphor-react'
import { CardEventProps } from '../../components/CardEvent'
import {
  IHomeCardSaude,
  IHomeCardAniversario,
  IHomeCardFerias,
  IHomeCardActivity,
  IHomeCardRequestPendente,
} from '../../schema/HomeCard'
import { ActivityLogProps } from '../../components/ActivityLog'
import { CardEventRequestProps } from '../../components/CardEventRequest'
import { ENUN_REQUEST, ENUN_REQUEST_COLOR } from './utils'
import { INotesList } from '../../schema/Notes'
import { GiPalmTree } from 'react-icons/gi'

const TYPE_REQUEST = {
  DOENCA: 'Doença',
  FERIAS: 'Férias',
  OUTROS: 'Outros',
}

export function transformHomeCardSaude(
  data: IHomeCardSaude[],
): CardEventProps[] {
  return (
    data &&
    data.map((item: IHomeCardSaude) => {
      return {
        icon: <Bed size={32} />,
        userName: item.Employee.name,
        date: `${item.date_start} - ${item.date_end}`,
        days: `${String(item.number_of_days)} dia(s)`,
        bgColor: '#FFF',
      }
    })
  )
}

// IHomeCardAniversario
export function transformHomeCardAniversario(
  data: IHomeCardAniversario[],
): CardEventProps[] {
  return (
    data &&
    data.map((item: any, index: number) => {
      return {
        icon: <Cake size={32} />,
        userName: item.name,
        date: item.birthday,
        bgColor: '#FFFFF',
      }
    })
  )
}

export function transformHomeCardFerias(
  data: IHomeCardFerias[],
): CardEventProps[] {
  return (
    data &&
    data.map((item: IHomeCardFerias, index: number) => {
      return {
        icon: <ShoppingBagOpen size={32} />,
        userName: item.Employee.name,
        date: `${item.date_start} - ${item.date_end}`,
        days: `${String(item.number_of_days)} dia(s)`,
        bgColor: '#FFFFFF',
      }
    })
  )
}

export function transformHomeCardActivity(
  data: IHomeCardActivity[],
): ActivityLogProps[] {
  return (
    data &&
    data.map((item: IHomeCardActivity) => {
      return {
        icon: <User size={18} />,
        description: item.information,
      }
    })
  )
}

export const swicthIcon = (type: string) => {
  switch (type) {
    case TYPE_REQUEST.DOENCA:
      return <Bed size={36} />
    case TYPE_REQUEST.FERIAS:
      return <GiPalmTree size={36} />
    case 'Dispensa':
      return <User size={36} />
    default:
      return <User size={36} />
  }
}

const swicthStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'aprovado':
      return '#26282a'
    case 'pendente':
      return '#26282a'
    case 'recusado':
      return '#26282a'
    default:
      return '#26282a'
  }
}

export const swicthStatusBorderBottomColor = (status: string) => {
  switch (status) {
    case ENUN_REQUEST.APPROVED:
      return ENUN_REQUEST_COLOR.APPROVED
    case ENUN_REQUEST.PENDING:
      return ENUN_REQUEST_COLOR.PENDING
    case ENUN_REQUEST.REJECTED:
      return ENUN_REQUEST_COLOR.REJECTED
    case ENUN_REQUEST.CANCELLED:
      return ENUN_REQUEST_COLOR.CANCELLED
    default:
      return '#26282a'
  }
}

export function organizeDetailRequest(days: string, detalhes: string) {
  return `${days} dia(s), ${detalhes}`
}

export function transformHomeCardRequest(
  data: IHomeCardRequestPendente[],
  handleAccept,
  handleEdit,
  handleDel,
  userId,
  handleDetails,
): CardEventRequestProps[] {
  return (
    data &&
    data.map((item: IHomeCardRequestPendente) => {
      return {
        icon: swicthIcon(item.ReasonAbsence.description),
        userName: item.Employee.name,
        date: `${item.date_start} - ${item.date_end}`,
        status: item.status,
        duration: String(item.number_of_days),
        bgColor: swicthStatusColor(item.status),
        borderBottonColor: swicthStatusBorderBottomColor(item.status),
        handleAccept: () => handleAccept(item.id),
        handleEdit: () => handleEdit(item.id),
        handleDel: () => handleDel(item.id),
        disabelBtn: item.status !== ENUN_REQUEST.PENDING,
        canEditOrDelete: item.employee_id === userId && !item.status_manager,
        handleDetails: () => handleDetails(item.id),
      }
    })
  )
}

export function transformHomeCardRequestInfoNotes(
  data: INotesList[],
): INotesList[] {
  return (
    data && data.length ?
    data.map((item: INotesList) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        employee_id: item.employee_id,
        image: item.image,
        link: item.link,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
        Tag: {
          description: item.Tag.description,
        },
        Employee: {
          name: item.Employee ? item.Employee.name : '',
          Contract: [
            {
              Role: {
                description: '',
              },
            },
          ],
        },
      }
    }): []
  )
}
