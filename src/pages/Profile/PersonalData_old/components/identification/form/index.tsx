import { SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { Input } from '../../../../../../components/Forms/Input'
import { Select } from '../../../../../../components/Forms/Select'
import { Employee } from '../../../../../../constants/entities/employee'
import { IdentificationType } from '../../../../../../constants/entities/identification-type'
import { IdentificationFormProps } from './identification-form.types'

const IdentificationForm: FC<IdentificationFormProps> = ({ employee }) => {
  const { register } = useForm()

  const handleChangeFilter = (value: string) => {}

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Select
          variantBg="white"
          borderBg="gray.100"
          name="types"
          label="Tipo de identificação"
          isDisabled
          value={employee[Employee.identificationType][IdentificationType.name]}
          data={[
            {
              description:
                employee[Employee.identificationType][IdentificationType.name],
              value:
                employee[Employee.identificationType][IdentificationType.name],
            },
          ]}
          onChange={(e: any) => handleChangeFilter(e.target.value)}
        />
        <Input
          label="Número de Identidade"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          value={employee[Employee.identificationNumber] ?? 'Não definido'}
          isDisabled
          {...register(Employee.identificationNumber, {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Endereço"
          type="text"
          backgroundColor={'white'}
          borderColor={'gray.100'}
          value={employee[Employee.address] ?? 'Não definido'}
          isDisabled
          {...register(Employee.address, {
            required: 'Campo obrigatório',
          })}
        />
      </SimpleGrid>
    </CardForm>
  )
}

export default IdentificationForm
