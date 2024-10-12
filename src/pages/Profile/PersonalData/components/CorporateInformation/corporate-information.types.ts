import { ICategory } from '../../../../../schema/Category'
import { EmployeeManager } from '../../../../../schema/Employee'
import { IRole } from '../../../../../schema/Role'

export interface CorporateInformationProps {
  employee: EmployeeManager
  register: any
  errors: any
  isSaving: boolean
  isDisableForm: any
  setIsDisableFrom: any
  categories: ICategory[]
  roles: IRole[]
}
