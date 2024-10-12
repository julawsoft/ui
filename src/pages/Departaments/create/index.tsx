import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import { ModalProps } from '../../../@types/modal.types'
import { Input } from '../../../components/Forms/Input'
import { Select } from '../../../components/Forms/Select'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { Toast } from '../../../components/Toast'
import { convertDataToSelect } from '../../../utils/convertDataToSelect'
import useCreateEmployee from './use-create'

const CreateEmployee = ({ onSave }: ModalProps) => {
  const {
    loading,
    errors,
    register,
    handleSubmit,
    handleSaveEmployee,
    identificationsType,
    provinces,
    categories,
    departments,
    typeContract,
    periodicity,
    roles,
    toastMessage,
  } = useCreateEmployee(onSave)

  if (loading) return <SpinnerProgress></SpinnerProgress>

  return (
    <form onSubmit={handleSubmit(handleSaveEmployee)}>
      <SimpleGrid columns={1} spacing={6}>
        <Input
          error={errors.name}
          label="Nome"
          placeholder="Nome do Colaborador"
          {...register('name', {
            required: 'Campo obrigatório',
            minLength: { value: 10, message: 'No mínimo 10 caracteres' },
          })}
        />
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={6} mt={4}>
        <Select
          error={errors.identification_type}
          label="Tipo de Identificação"
          data={convertDataToSelect(identificationsType, 'description')}
          {...register('identification_type', {
            required: 'Campo obrigatório',
            valueAsNumber: true,
          })}
        />

        <Input
          error={errors.identification_number}
          label="N.º de Identificação"
          placeholder=""
          {...register('identification_number', {
            required: 'Campo obrigatório',
          })}
        />

        <Select
          error={errors.gender}
          label="Género"
          data={[
            { description: 'Masculino', value: 'M' },
            { description: 'Feminino', value: 'F' },
          ]}
          {...register('gender', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />

        <Input
          error={errors.date_of_birth}
          label="Data de nascimento"
          type="date"
          {...register('date_of_birth', {
            required: 'Campo obrigatório',
          })}
        />

        <Input
          error={errors.email}
          type="email"
          label="E-mail"
          placeholder="ex.: colaborador@empresa.ao"
          {...register('email', {
            required: 'Campo obrigatório',
          })}
        />

        <Input
          error={errors.phone}
          label="Telefone"
          placeholder="Ex.: 923 000 000"
          {...register('phone', {
            required: 'Campo obrigatório',
          })}
        />
        <Input
          error={errors.employee_number}
          label="Número de colaborador"
          placeholder="Digite o n.º do colaborador"
          {...register('employee_number', {
            required: 'Campo obrigatório',
          })}
        />

        <Input
          error={errors.joining_date}
          label="Data de ingresso"
          type="date"
          {...register('joining_date', {
            required: 'Campo obrigatório',
          })}
        />
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={6} mt={6}>
        <Select
          error={errors.province_id}
          label="Províncias"
          data={convertDataToSelect(provinces, 'name')}
          {...register('province_id', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />
        <Select
          error={errors.category_id}
          label="Categoria"
          data={convertDataToSelect(categories, 'name')}
          {...register('category_id', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />
        <Select
          error={errors.organograma_id}
          label="Departamento"
          data={convertDataToSelect(departments, 'description')}
          {...register('organograma_id', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />

        <Select
          error={errors.function_id}
          label="Função"
          data={convertDataToSelect(roles, 'name')}
          {...register('function_id', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />
        <Select
          error={errors.type_contract_id}
          label="Tipo de Contracto"
          data={convertDataToSelect(typeContract, 'name')}
          {...register('type_contract_id', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />
        <Select
          error={errors.function_id}
          label="Peridicidade"
          data={convertDataToSelect(periodicity, 'name')}
          {...register('periodicity_id', {
            valueAsNumber: true,
            required: 'Campo obrigatório',
          })}
        />
      </SimpleGrid>

      <Flex width="100%" mt={6}>
        <Button type="submit" colorScheme="green" size="lg">
          Salvar
        </Button>
      </Flex>
      {toastMessage && (
        <Toast
          title={toastMessage.title}
          description={toastMessage.message}
          status={toastMessage.status}
          isShow={!!toastMessage}
        ></Toast>
      )}
    </form>
  )
}

export default CreateEmployee
