import useAsyncState from '../../../hooks/use-async-state'
import { useForm } from 'react-hook-form'
import { createEmployee } from '../../../services/Employee/create-employee.service'
import useColabContext from '../../../context_api'
import { toast } from 'react-toastify'

const useCreateEmployee = (onSave: () => void) => {
  const { colabProvider } = useColabContext()
  const { toastMessage, setToastMessage, loading, setLoading } = useAsyncState()

  const groupUser = colabProvider.auth.profile

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  async function handleSaveEmployee(data: any) {
    try {
      setLoading(true)
      const response = await createEmployee(data)
      if(response){
        if (response.response.statusCode === 201) {
          toast.success('Invite, enviado com sucesso!')
        } else {
          toast.error(response.response.message)
        }
        handleClose()
        setLoading(false)
      }
    } catch (error) {
      setToastMessage({
        message: 'Ocorreu alguma falha no cadastrado',
        status: 'error',
        title: 'Falha',
      })
      setLoading(false)
    }
  }

  function handleClose() {
    onSave()
    reset()
  }

  return {
    loading,
    setLoading,
    toastMessage,
    setToastMessage,
    handleSubmit,
    handleSaveEmployee,
    errors,
    register,
    groupUser,
  }
}

export default useCreateEmployee
