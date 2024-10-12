import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { Input } from '../../../../../../components/Forms/Input'
import { Select } from '../../../../../../components/Forms/Select'
import { Employee } from '../../../../../../constants/entities/employee'
import { GeneralInformationFormProps } from './general-information-form.types'
import PermissionGate from '../../../../../../hooks/permissionGate'
import { Roles } from '../../../../../../routes/roles'

const GeneralInformationForm: FC<GeneralInformationFormProps> = ({
  employee,
  register,
  errors,
  isSaving,
  isDisableForm,
  setIsDisableFrom,
}) => {
  const gender = [
    {
      id: 1,
      descriptin: 'Masculino',
    },
    {
      id: 2,
      descriptin: 'Femenino',
    },
    {
      id: 3,
      descriptin: 'Não definido',
    },
  ]

  const handleUpdateEmployee = () => {
    setIsDisableFrom({ ...isDisableForm, form1: false })
  }

  const handleChangeFilter = (value: string) => {}

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Input
          label="Nome"
          type="text"
          defaultValue={employee[Employee.name] ?? ''}
          isReadOnly={isDisableForm.form1}
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('nome', {
            required: 'Campo obrigatório',
          })}
          error={errors.nome}
        />
        <Input
          label="E-mail"
          type="email"
          defaultValue={employee.Contact ? employee.Contact.email : ''}
          isReadOnly={isDisableForm.form1}
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('email', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Data de nascimento"
          type="date"
          defaultValue={
            employee.birthday.toString().substring(0, 10) ?? 'Não definido'
          }
          isReadOnly={isDisableForm.form1}
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('born_date', {
            required: 'Campo obrigatório',
          })}
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          label="Género"
          isReadOnly={isDisableForm.form1}
          defaultValue={employee.gender ? employee.gender : ''}
          {...register('genero', {
            required: 'Campo obrigatório',
          })}
          data={gender.map((item) => ({
            id: item.id,
            description: item.descriptin,
          }))}
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          label="Nacionalidade"
          defaultValue={employee.nationality}
          isReadOnly={isDisableForm.form1}
          {...register('nationality', {
            required: 'Campo obrigatório',
          })}
          data={[
            {
              description: employee.nationality,
              value: employee.nationality,
            },
            {
              description: 'Não definida',
              value: 0,
            },
          ]}
          onChange={(e: any) => handleChangeFilter(e.target.value)}
        />
        <Input
          label="Número de telefone"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          defaultValue={employee.Contact.phone}
          isReadOnly={isDisableForm.form1}
          {...register('phone_number', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Contacto de emergência | Nome"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          defaultValue={employee.Contact.alternative_phone}
          isReadOnly={isDisableForm.form1}
          {...register('alternative_phone', {
            required: false,
          })}
        />
        <PermissionGate roles={[Roles.PROFILE.can_alter_data_of_employee]}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            {isDisableForm.form1 ? (
              <>
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
              </>
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

export default GeneralInformationForm
