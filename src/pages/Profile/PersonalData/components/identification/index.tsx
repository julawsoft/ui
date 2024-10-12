import { FC } from 'react'
import IdentificationForm from './form'
import { IdentificationProps } from './identification.types'

const Identification: FC<IdentificationProps> = ({
  employee,
  register,
  errors,
  isSaving,
  isDisableForm,
  setIsDisableFrom,
  identificationsType,
}) => {
  return (
    <IdentificationForm
      employee={employee}
      register={register}
      errors={errors}
      isSaving={isSaving}
      isDisableForm={isDisableForm}
      setIsDisableFrom={setIsDisableFrom}
      identificationsType={identificationsType}
    ></IdentificationForm>
  )
}

export default Identification
