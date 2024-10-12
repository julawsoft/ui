import { SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { CardForm } from '../../../../../../components/Forms/CardForm'
import { Input } from '../../../../../../components/Forms/Input'
import { Select } from '../../../../../../components/Forms/Select'
import { Category } from '../../../../../../constants/entities/category'
import { Employee } from '../../../../../../constants/entities/employee'
import { Funcction } from '../../../../../../constants/entities/function'
import { CorporateInformationFormProps } from './form.types'

const CorporateInformationForm: FC<CorporateInformationFormProps> = ({
  employee,
}) => {
  const { register } = useForm()

  const handleChangeGenre = (value: string) => value
  const handleChangeCategory = (value: string) => value

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Select
          variantBg="white"
          borderBg="gray.100"
          name="types"
          label="Função"
          isDisabled
          data={[
            {
              description: employee[Employee.function]
                ? employee[Employee.function][Funcction.name]
                : 'Não definida',
              value: employee[Employee.function]
                ? employee[Employee.function][Funcction.name]
                : 'Não definida',
            },
          ]}
          value={
            employee[Employee.function]
              ? employee[Employee.function][Funcction.name]
              : 'Não definida'
          }
          onChange={(e: any) => handleChangeGenre(e.target.value)}
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          name="types"
          label="Categoria"
          isDisabled
          data={[
            {
              description: employee[Employee.category][Category.name],
              value: employee[Employee.category][Category.name],
            },
          ]}
          value={employee[Employee.category][Category.name]}
          onChange={(e: any) => handleChangeCategory(e.target.value)}
        />

        <Input
          label="Número de funcionário"
          type="text"
          isDisabled
          value={employee[Employee.employeeNumber] ?? 'Não definido'}
          backgroundColor={'white'}
          borderColor={'gray.100'}
          {...register('emploe_name', {
            required: 'Campo obrigatório',
          })}
        />
      </SimpleGrid>
    </CardForm>
  )
}

export default CorporateInformationForm
