import { EmployDTO } from '../../../../../../services/Employee/get-employee-by-id.service'
import { useForm } from 'react-hook-form'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { SimpleGrid } from '@chakra-ui/react'
import { Input } from '../../../../../../components/Forms/Input'
import { Employee } from '../../../../../../constants/entities/employee'

interface ProfileFormProps {
  employee: EmployDTO
}

export const ProfileForm = ({ employee }: ProfileFormProps) => {
  const { register } = useForm()

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Input
          label="E-mail"
          type="email"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          isDisabled
          value={employee ? employee[Employee.email] : ''}
          {...register('email', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Local de trabalho"
          type="text"
          isDisabled
          backgroundColor={'white'}
          borderColor={'gray.100'}
          value="Luanda"
          {...register('local-trabalho', {
            required: 'Campo obrigatório',
          })}
        />
      </SimpleGrid>
    </CardForm>
  )
}
