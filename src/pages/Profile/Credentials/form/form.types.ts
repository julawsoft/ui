import {IEmployee} from '../../../../schema/Employee'

export interface CredentialFormProps {
    employee: IEmployee,
    employeeId: number,
    oldPassword: string,
    newPassword: string,
    repeatNewPassword: string
}
