import { FC } from 'react'
import { CorporateInformationProps } from './corporate-information.types'
import CorporateInformationForm from './form'

const CorporateInformation: FC<CorporateInformationProps> = ({
  employee,
  register,
  errors,
  isSaving,
  isDisableForm,
  setIsDisableFrom,
  categories,
  roles,
}) => {
  return (
    <CorporateInformationForm
      employee={employee}
      register={register}
      errors={errors}
      isSaving={isSaving}
      isDisableForm={isDisableForm}
      setIsDisableFrom={setIsDisableFrom}
      categories={categories}
      roles={roles}
    ></CorporateInformationForm>
  )
}

export default CorporateInformation
