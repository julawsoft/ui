// src/store/useStore.js
import create from 'zustand'

type Solicitation = {
  indexStep: number
  handleNext: () => void
  handleBack: () => void
}

const useSetupSteps = create<Solicitation>((set) => ({
  indexStep: 0,
  handleNext: () => {
    set((state) => ({ ...state, indexStep: state.indexStep - 1 }))
  },
  handleBack: () => {
    set((state) => ({ ...state, indexStep: state.indexStep + 1 }))
  },
}))

export default useSetupSteps
