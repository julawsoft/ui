import { EmployeeManager } from '../../../../../schema/Employee'
import { IIdentificationTypeProps } from '../../../../../services/IdentificationType.service'

export interface IdentificationProps {
  employee: EmployeeManager
  register: any
  errors: any
  isSaving: boolean
  isDisableForm: any
  setIsDisableFrom: any
  identificationsType: IIdentificationTypeProps[]
}
