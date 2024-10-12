import { useEffect, useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { IProvince } from '../../../schema/Province'
import { useForm } from 'react-hook-form'
import { createEmployee } from '../../../services/Employee/create-employee.service'
import { DepartmentService } from '../../../services/Organograma/DepartmentService'
import { CategoryService } from '../../../services/Organograma/CategoryService'
import { getIdentificationsType } from '../../../services/IdentificationType.service'
import { RoleService } from '../../../services/Organograma/RoleService'
import { getProvinces } from '../../../services/Provinces.service'
import { IPeriodicity } from '../../../schema/Periodicity'
import { ITypeContract } from '../../../schema/TypeContract'
import { getTypeContract } from '../../../services/TypeContract.service'
import { getPeriodicity } from '../../../services/Periodicity.service'
import useColabContext from '../../../context_api'

const useCreateEmployee = (onSave: () => void) => {
  const { colabProvider } = useColabContext()
  const [provinces, setProvinces] = useState<IProvince[]>([])
  const [typeContract, setTypeContract] = useState<ITypeContract[]>([])
  const [periodicity, setPeriodicity] = useState<IPeriodicity[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [identificationsType, setIdentificationsType] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const { toastMessage, setToastMessage, loading, setLoading } = useAsyncState()

  const groupUser = colabProvider.auth.profile
  // Promisse.all
  useEffect(() => {
    setLoading(true)
    const init = async () => {
      await getAllIdentificationsType()
      await getAllCategories()
      await getAllDepartments()
      await getAllRoles()
      await getAllProvinces()
      await getAllTypeContract()
      await getAllPeriodicity()
    }

    init()
    setLoading(false)
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  async function handleSaveEmployee(data: any) {
    try {
      setLoading(true)
      await createEmployee(data)

      setToastMessage({
        message: 'Colaborador cadastrado',
        status: 'success',
        title: 'Sucesso',
      })
      handleClose()
      setLoading(false)
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

  async function getAllIdentificationsType() {
    const response = await getIdentificationsType()
    setIdentificationsType(response)
  }

  async function getAllCategories() {
    const response = await CategoryService.getAll()
    setCategories(response)
  }

  async function getAllDepartments() {
    const response = await DepartmentService.getAll()
    setDepartments(response)
  }

  async function getAllRoles() {
    const response = await RoleService.getAll()
    setRoles(response)
  }

  async function getAllProvinces() {
    const response = await getProvinces()
    setProvinces(response)
  }

  async function getAllTypeContract() {
    const response = await getTypeContract()
    setTypeContract(response)
  }

  async function getAllPeriodicity() {
    const response = await getPeriodicity()
    setPeriodicity(response)
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
    provinces,
    roles,
    identificationsType,
    categories,
    departments,
    typeContract,
    periodicity,
  }
}

export default useCreateEmployee
