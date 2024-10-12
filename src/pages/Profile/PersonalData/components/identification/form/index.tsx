import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { Input } from '../../../../../../components/Forms/Input'
import { Select } from '../../../../../../components/Forms/Select'
import { Employee } from '../../../../../../constants/entities/employee'
import { IdentificationFormProps } from './identification-form.types'
import PermissionGate from '../../../../../../hooks/permissionGate'
import { Roles } from '../../../../../../routes/roles'
import { IIdentificationTypeProps } from '../../../../../../services/IdentificationType.service'

const IdentificationForm: FC<IdentificationFormProps> = ({
  employee,
  register,
  errors,
  isSaving,
  isDisableForm,
  setIsDisableFrom,
  identificationsType,
}) => {
  const handleUpdateEmployee = () => {
    setIsDisableFrom({ ...isDisableForm, form2: false })
  }

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Select
          variantBg="white"
          borderBg="gray.100"
          label="Identificação"
          {...register('type_document_id')}
          error={errors.type_document_id}
          data={identificationsType.map((item: IIdentificationTypeProps) => ({
            description: item.description,
            value: item.id,
          }))}
          defaultValue={
            employee.type_document_id ? employee.type_document_id : ''
          }
          isReadOnly={isDisableForm.form2}
        />
        <Input
          label="Número do documento de identificação"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('document_number')}
          error={errors.document_number}
          defaultValue={employee.document_number}
          isReadOnly={isDisableForm.form2}
        />
        <Input
          label="Endereço/Morada"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          defaultValue={employee.Contact.address ?? 'N/A'}
          isReadOnly={isDisableForm.form2}
          {...register('address', {
            required: true,
          })}
          error={errors.address}
        />
        <PermissionGate roles={[Roles.PROFILE.can_alter_data_of_employee]}>
          <Box display="flex" justifyContent="flex-end">
            {isDisableForm.form2 ? (
              <span
                style={{
                  backgroundColor: '#C2912E',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={handleUpdateEmployee}
              >
                Alterar{' '}
              </span>
            ) : (
              <Button
                type="submit"
                style={{ backgroundColor: 'green', color: '#fff' }}
                isLoading={isSaving}
                loadingText={'Alterando...'}
              >
                Salvar
              </Button>
            )}
          </Box>
        </PermissionGate>
      </SimpleGrid>
    </CardForm>
  )
}

export default IdentificationForm
