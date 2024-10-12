import { SimpleGrid } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CardForm } from '../../../../components/Forms/CardForm'
import { Input } from '../../../../components/Forms/Input'
import { Select } from '../../../../components/Forms/Select'
import { Employee } from '../../../../constants/entities/employee'
import { Funcction } from '../../../../constants/entities/function'
import { EmployDTO } from '../../../../services/Employee/get-employee-by-id.service'

const ContratoForm = ({ employee }: { employee: EmployDTO }) => {
  const { register } = useForm()

  const handleChangeContractType = (value: string) => {}

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <Input
          label="Função"
          type="text"
          isDisabled
          backgroundColor={'white'}
          value={
            employee[Employee.function] ? [Funcction.name] : 'Não definida'
          }
          borderColor={'gray.100'}
          {...register('cargo', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          label="Período"
          type="text"
          isDisabled
          backgroundColor={'white'}
          borderColor={'gray.100'}
          value={employee[Employee.periodicity] ?? 'Não definido'}
          {...register('periodo', {
            required: 'Campo obrigatório',
          })}
        />
        <Select
          variantBg="white"
          borderBg="gray.100"
          isDisabled
          name="types"
          label="Tipo de contrato"
          value={employee[Employee.typeContract] ?? 0}
          data={[
            {
              description: employee[Employee.typeContract] as string,
              value: employee[Employee.typeContract],
            },
            {
              description: 'Não definido',
              value: 0,
            },
          ]}
          onChange={(e: any) => handleChangeContractType(e.target.value)}
        />
        <Input
          label="Término"
          type="text"
          isDisabled
          backgroundColor={'white'}
          borderColor={'gray.100'}
          value={employee[Employee.FinishDate] ?? 'Não definido'}
          {...register('Employee.FinishDate', {
            required: 'Campo obrigatório',
          })}
        />
      </SimpleGrid>
    </CardForm>
  )
}

export default ContratoForm
