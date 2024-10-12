import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import GeneralInformationForm from './form'
import { GeneralInformationProps } from './general-information.types'

const GeneralInformation: FC<GeneralInformationProps> = ({
  employee,
  register,
  errors,
  isSaving,
  isDisableForm,
  setIsDisableFrom,
}) => {
  return (
    <Box flex={1}>
      <GeneralInformationForm
        employee={employee}
        register={register}
        errors={errors}
        isSaving={isSaving}
        isDisableForm={isDisableForm}
        setIsDisableFrom={setIsDisableFrom}
      ></GeneralInformationForm>
    </Box>
  )
}

export default GeneralInformation
