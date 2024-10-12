import { useEffect, useState } from 'react'
import useAsyncState from '../../hooks/use-async-state'
import { IEmployee } from '../../schema/Employee'
import { getEmployees } from '../../services/Employee/get-employees.service'
import { useDisclosure } from '@chakra-ui/react'
import useColabContext from '../../context_api'
import { getFilterServiceEmployees } from '../../services/Employee/get-employees-filter.service'

const useEmployee = () => {
  const { loading, setLoading, error, setError, message, setMessage } =
    useAsyncState()
  const [dataEmployees, setDataEmployees] = useState<IEmployee[]>([])

  const { colabProvider } = useColabContext()

  const [filter, setFilter] = useState<string>('')
  const [loadingFilter, setLoadingFilter] = useState<boolean>(false)

  const groupUser = colabProvider.auth.profile

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleClose() {
    onClose()
  }

  function handleFilterEmployee(filterInput: string) {
    setFilter(filterInput)
    if (filter.length === 0) {
      setFilter('')
      return getAllEmployees()
    }
    return getFilterEmployees(filter)
  }

  async function getFilterEmployees(filter: string) {
    setLoadingFilter(true)
    setTimeout(async () => {
      try {
        const response = await getFilterServiceEmployees(filter)
        setDataEmployees(response)
        setLoadingFilter(false)
      } catch (error) {
        setLoadingFilter(false)
        setError(true)
        setMessage(String(error))
      } finally {
        setLoadingFilter(false)
      }
    }, 1000)
  }

  async function getAllEmployees() {
    setLoading(true)
    setTimeout(async () => {
      try {
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
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return {
    loading,
    dataEmployees,
    groupUser,
    onOpen,
    isOpen,
    onClose,
    handleClose,
    error,
    message,
    getAllEmployees,
    handleFilterEmployee,
    filter,
    loadingFilter,
    setLoadingFilter,
    setLoading,
    setError,
    setMessage,
  }
}

export default useEmployee
