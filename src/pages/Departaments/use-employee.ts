import { useEffect, useState } from 'react'
import useAsyncState from '../../hooks/use-async-state'
import { IEmployee } from '../../schema/Employee'
import { getEmployees } from '../../services/Employee/get-employees.service'
import { useDisclosure } from '@chakra-ui/react'
import useColabContext from '../../context_api'

const useEmployee = () => {
  const { loading, setLoading } = useAsyncState()
  const [dataEmployees, setDataEmployees] = useState<IEmployee[]>([])
  const { colabProvider } = useColabContext()

  const groupUser = colabProvider.auth.profile

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const init = async () => {
      await getAllEmployees()
    }
    init()
  }, [])

  function handleClose() {
    onClose()
  }

  async function getAllEmployees() {
    try {
      setLoading(true)
      const response = await getEmployees({
        departmants: undefined,
        categories: undefined,
        status: undefined,
        employee: undefined,
      })
      setDataEmployees(response)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return {
    loading,
    dataEmployees,
    groupUser,
    onOpen,
    isOpen,
    onClose,
    handleClose,
    getAllEmployees,
  }
}

export default useEmployee
