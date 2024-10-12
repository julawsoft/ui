import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { Input } from '../../../../../../components/Forms/Input'
import { Select } from '../../../../../../components/Forms/Select'
import { CorporateInformationFormProps } from './form.types'
import PermissionGate from '../../../../../../hooks/permissionGate'
import { Roles } from '../../../../../../routes/roles'
import { IRole } from '../../../../../../schema/Role'
import { ICategory } from '../../../../../../schema/Category'

const CorporateInformationForm: FC<CorporateInformationFormProps> = ({
  employee,
  register,
  errors,
  isSaving,
  isDisableForm,
  setIsDisableFrom,
  categories,
  roles,
}) => {
  const handleUpdateEmployee = () => {
    setIsDisableFrom({ ...isDisableForm, form3: false })
  }

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Select
          variantBg="white"
          borderBg="gray.100"
          name="types"
          label="Título Profissional"
          isReadOnly={isDisableForm.form3}
          {...register('role_id')}
          error={errors.role_id}
          data={roles.map((item: IRole) => ({
            description: item.description,
            value: item.id,
          }))}
          defaultValue={
            employee.Contract && employee.Contract[0]
              ? employee.Contract[0].Role.id
              : ''
          }
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          isReadOnly={isDisableForm.form3}
          name="types"
          label="Categoria"
          {...register('category_id')}
          error={errors.category_id}
          data={categories.map((item: ICategory) => ({
            description: item.description,
            value: item.id,
          }))}
          defaultValue={
            employee.Contract && employee.Contract[0]
              ? employee.Contract[0].Category.id
              : ''
          }
        />

        <Input
          label="Número do Colaborador"
          type="text"
          isReadOnly={isDisableForm.form3}
          defaultValue={
            employee.Contract[0] ? employee.Contract[0].employee_number : 0
          }
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('employee_number', {
            required: true,
          })}
          error={errors.employee_number}
        />
        <PermissionGate roles={[Roles.PROFILE.can_alter_data_of_employee]}>
          <Box display="flex" justifyContent="flex-end">
            {isDisableForm.form3 ? (
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

export default CorporateInformationForm
