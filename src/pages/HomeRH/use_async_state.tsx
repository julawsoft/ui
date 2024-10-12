import { useEffect, useState } from 'react'

import { getTotalEmployees } from '../../services/DashboardRH/totalEmployees'
import { getTotalPendingRequest } from '../../services/DashboardRH/totalPendingRequest'
import { getTotalUnjustifiedAbsences } from '../../services/DashboardRH/totalUnjustifiedAbsences'
import { getTotalEmployeesEndingContract } from '../../services/DashboardRH/totalEmployeesEndingContract'
import { getTotalEmployeesByCategory } from '../../services/DashboardRH/totalEmployeesByCategory'
import { getTotalEmployeesByDepartment } from '../../services/DashboardRH/totalEmployeesByDepartment'
import {
  IEmployeeContract,
  IEmployeesByCategory,
  IEmployeesByDepartment,
  ILatestRequestedAbsences,
} from '../../services/DashboardRH/interfaces'
import { getLatestRequestedAbsences } from '../../services/DashboardRH/latestRequestedAbsences'
import { getTotalJustifiedAbsences } from '../../services/DashboardRH/totalJustifiedAbsences'
import { getIndexAssiduity } from '../../services/DashboardRH/totalIndexAssiduity'
import { getTotalEmployeesOnVacation } from '../../services/DashboardRH/totalEmployeesOnVacation'
import { toast } from 'react-toastify'
import { getTotalPendingDocuments } from '../../services/DashboardRH/totalPendingDocuments'
import { getTotalPendingAbsences } from '../../services/DashboardRH/totalPendingAbsences'

function UseCaseState() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [totalColab, setTotalColab] = useState<number>(0)
  const [vocationColab, setVocationColab] = useState<number>(0)
  const [solicitationPending, setSolicitationPending] = useState<number>(0)

  const [employeesEndingContract, setEmployeesEndingContract] = useState<
    IEmployeeContract[]
  >([])
  const [employeesByCategory, setEmployeesByCategory] = useState<
    IEmployeesByCategory[]
  >([])
  const [employeesByDepartment, setEmployeesByDepartment] = useState<
    IEmployeesByDepartment[]
  >([])

  const [latestRequestedAbsences, setLatestRequestedAbsences] = useState<
    ILatestRequestedAbsences[]
  >([])

  const [totalPendingDocuments, setTotalPendingDocuments] = useState<number>(0)

  const [totalPendingAbsences, setTotalPendingAbsences] = useState<number>(0)

  const [indexAssiduity, setIndexAssiduity] = useState<number>(50)
  const [indexNotAssiduity, setNotIndexAssiduity] = useState<number>(20)

  const [unjustifiedAbsence, setUnjustifiedAbsence] = useState<number>(0)
  const [justifiedAbsence, setJustifiedAbsence] = useState<number>(0)

  const absence = [
    { name: 'Injustificadas', value: unjustifiedAbsence },
    { name: 'Justificadas', value: justifiedAbsence },
  ]

  const [presence] = useState<any>([
    { name: 'Performance de colaboradores assíduos', value: indexAssiduity },
    {
      name: 'Performance de colaboradores nao assíduos',
      value: indexNotAssiduity,
    },
  ])

  useEffect(() => {
    async function init() {
      try {
        setTimeout(async () => {
          await initRequests()
          setIsLoading(false)
        }, 1000)
      } catch (err: any) {
        toast(`${JSON.stringify(err?.message)}`)
        setIsLoading(false)
      }
    }
    init()
  }, [])

  const initRequests = async () => {
    totalEmployees()
    totalPendingRequest()
    totalEmployeesEndingContract()
    totalEmployeesByCategory()
    totalEmployeesByDepartment()
    totalLatestRequestedAbsences()
    totalIndexAssiduity()
    totalEmployeesOnVacation()
    totalUnjustifiedAbsences()
    totalJustifiedAbsences()
    fnTotalPendingDocuments()
    fnTotalPendingAbsences()
  }

  async function totalEmployees() {
    const response = await getTotalEmployees()
    setTotalColab(response)
  }
  async function totalPendingRequest() {
    const response = await getTotalPendingRequest()
    setSolicitationPending(response)
  }
  async function totalUnjustifiedAbsences() {
    const response = await getTotalUnjustifiedAbsences()
    setUnjustifiedAbsence(response)
  }
  async function totalJustifiedAbsences() {
    const response = await getTotalJustifiedAbsences()
    setJustifiedAbsence(response)
  }
  async function totalEmployeesEndingContract() {
    const response = await getTotalEmployeesEndingContract()
    setEmployeesEndingContract(response)
  }
  async function totalEmployeesByCategory() {
    const response = await getTotalEmployeesByCategory()
    setEmployeesByCategory(response)
  }
  async function totalEmployeesByDepartment() {
    const response = await getTotalEmployeesByDepartment()
    setEmployeesByDepartment(response)
  }
  async function totalLatestRequestedAbsences() {
    const response = await getLatestRequestedAbsences()
    setLatestRequestedAbsences(response)
  }
  async function totalIndexAssiduity() {
    const response = await getIndexAssiduity()
    setIndexAssiduity(response.AssíduousEmployees)
    setNotIndexAssiduity(response.nonAttendanceEmployees)
  }
  async function totalEmployeesOnVacation() {
    const response = await getTotalEmployeesOnVacation()
    setVocationColab(response)
  }

  async function fnTotalPendingDocuments() {
    setTotalPendingDocuments(await getTotalPendingDocuments())
  }

  async function fnTotalPendingAbsences() {
    setTotalPendingAbsences(await getTotalPendingAbsences())
  }

  return {
    isLoading,
    setIsLoading,
    totalColab,
    vocationColab,
    solicitationPending,
    employeesEndingContract,
    employeesByCategory,
    employeesByDepartment,
    latestRequestedAbsences,
    indexAssiduity,
    indexNotAssiduity,
    unjustifiedAbsence,
    justifiedAbsence,
    absence,
    presence,
    totalPendingDocuments,
    totalPendingAbsences,
  }
}

export default UseCaseState
