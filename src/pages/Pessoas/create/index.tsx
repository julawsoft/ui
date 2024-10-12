import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import { Input } from '../../../components/Forms/Input'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { Toast } from '../../../components/Toast'
import useCreateEmployee from './use-create'

interface IEmployeeModal {
  onSave: (data?: any) => void
  email?: string
  locknputModal?: boolean
}

const CreateEmployee = ({ onSave, email, locknputModal }: IEmployeeModal) => {
  const {
    loading,
    errors,
    register,
    handleSubmit,
    handleSaveEmployee,
    toastMessage,
  } = useCreateEmployee(onSave)

  if (loading) return <SpinnerProgress></SpinnerProgress>

  return (
    <form onSubmit={handleSubmit(handleSaveEmployee)}>
      <SimpleGrid columns={1} spacing={6}>
        <Input
          error={errors.email}
          type="email"
          label="E-mail"
          placeholder="ex.: colaborador@empresa.ao"
          {...register('email', {
            required: 'Campo obrigatório',
          })}
          defaultValue={email}
          isReadOnly={locknputModal}
        />
      </SimpleGrid>
      <Flex width="100%" mt={6}>
        <Button type="submit" colorScheme="green" size="lg">
          Enviar
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
