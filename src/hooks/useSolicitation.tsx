// src/store/useStore.js
import create from 'zustand'
import { toast } from 'react-toastify'
import { homeCardRequestService } from '../services/Home/homeRequest'
import { CardEventRequestProps } from '../components/CardEventRequest'
import { transformHomeCardRequest } from '../pages/Home/transform'

type Solicitation = {
  solicitacoes: CardEventRequestProps[] | []
  loadingAniversariantes: boolean
  request_status: string
  modal_text: string
  isRequestSelected: number
  ReloadSolicitacao: boolean
  setReloadSolicitacao: (status: boolean) => void
  setIdRequestSelected: (idRequest: number) => void
  setRequestStatus: (status: string) => void
  setModalText: (text: string) => void
  lizarSolicitations: (
    userId: number,
    handleAccept: any,
    handleEdit: any,
    handleDel: any,
    handleDetails: any,
  ) => void
  adicionarSolicitacao: (solicitation: CardEventRequestProps[]) => void
}

const useSolicitation = create<Solicitation>((set) => ({
  solicitacoes: [],
  loadingAniversariantes: false,
  request_status: '',
  modal_text: '',
  isRequestSelected: 0,
  ReloadSolicitacao: false,
  setReloadSolicitacao: (status: boolean) => {
    set((state) => ({ ...state, ReloadSolicitacao: status }))
  },
  setIdRequestSelected: (idRequest) => {
    set({ isRequestSelected: idRequest })
  },
  setRequestStatus: (status: string) => {
    set({ request_status: status })
  },
  setModalText: (text: string) => {
    set({ modal_text: text })
  },
  adicionarSolicitacao: (solicitation) =>
    set((state) => ({
      ...state,
      solicitacoes: solicitation,
    })),
   lizarSolicitations: async (
    userId: number,
    handleAccept,
    handleEdit,
    handleDel,
    handleDetails,
  ) => {
    set({ loadingAniversariantes: true })
    try {
      const response = await homeCardRequestService(userId)
      const responseTransformed = transformHomeCardRequest(
        response.data,
        handleAccept,
        handleEdit,
        handleDel,
        userId,
        handleDetails,
      )
      set({ solicitacoes: responseTransformed, loadingAniversariantes: false })
    } catch (error) {
      toast.error(String(error))
      console.error('Erro ao buscar aniversariantes:', error)
      set({ loadingAniversariantes: false })
    }
  },
}))

export default useSolicitation
