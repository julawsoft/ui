import { SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { Input } from '../../../../../../components/Forms/Input'
import { Select } from '../../../../../../components/Forms/Select'
import { Employee } from '../../../../../../constants/entities/employee'
import { GeneralInformationFormProps } from './general-information-form.types'

const GeneralInformationForm: FC<GeneralInformationFormProps> = ({
  employee,
}) => {
  const { register } = useForm()

  const getGender = (genderSigla: string) => {
    switch (genderSigla) {
      case 'M':
      case 'm':
        return 'Masculino'

      case 'F':
      case 'f':
        return 'Feminino'

      default:
        return 'Desconhecido'
    }
  }

  const handleChangeFilter = (value: string) => {}
  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Input
          label="Nome"
          type="text"
          value={employee[Employee.name] ?? ''}
          isDisabled
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('nome', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="E-mail"
          type="email"
          value={employee[Employee.email] ?? ''}
          isDisabled
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('email', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Data de nascimento"
          type="date"
          value={employee[Employee.dateOfBirth] ?? 'Não definido'}
          isDisabled
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('born_date', {
            required: 'Campo obrigatório',
          })}
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          name="types"
          label="Género"
          isDisabled
          value={employee[Employee.gender]}
          data={[
            {
              description:
                getGender(employee[Employee.gender]) ?? 'desconhecido',
              value: employee[Employee.gender] ?? 'desconhecido',
            },
          ]}
          onChange={(e: any) => handleChangeFilter(e.target.value)}
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          name="types"
          label="Nacionalidade"
          value={employee[Employee.nacionality] ?? 0}
          isDisabled
          data={[
            {
              description: employee[Employee.nacionality],
              value: employee[Employee.nacionality],
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
          value={employee[Employee.phone]}
          isDisabled
          {...register('phone_number', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Número de telefone (alternativo)"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          value={employee[Employee.phoneAlt]}
          isDisabled
          {...register('phone_number_two')}
        />
      </SimpleGrid>
    </CardForm>
  )
}

export default GeneralInformationForm
