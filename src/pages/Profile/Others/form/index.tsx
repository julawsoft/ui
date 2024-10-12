import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CardForm } from '../../../../components/Forms/CardForm'
import { Textarea } from '../../../../components/Forms/textarea'
import SpinnerProgress from '../../../../components/SpinnerProgress'
import { Toast } from '../../../../components/Toast'
import { Employee } from '../../../../constants/entities/employee'
import useAsyncState from '../../../../hooks/use-async-state'
import { updateAboutEmployee } from '../../../../services/Employee/update-about-employee.service'
import { OthersFormProps } from './form.types'

const OthersForm: FC<OthersFormProps> = ({ employee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { loading, setLoading, setToastMessage, toastMessage } = useAsyncState()
  const [enableEdit, setEnableEdit] = useState(false)

  const handleSave: SubmitHandler<any> = async (data) => {
    try {
      setLoading(true)

      await updateAboutEmployee({ about: data.outros, id: employee.id })
      setToastMessage({
        message: 'O seu perfil foi actualizado',
        status: 'success',
        title: 'Sucesso',
      })
      setLoading(false)
      // onSave()
    } catch (erro) {
    }
  }

  if (loading) return <SpinnerProgress></SpinnerProgress>

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <form onSubmit={handleSubmit(handleSave)}>
          <Textarea
            backgroundColor={'white'}
            style={{
              borderRadius: '8px',
              height: '351px',
              marginBottom: '16px',
            }}
            size="sm"
            label="Sobre mim"
            defaultValue={employee[Employee.about]}
            {...register('outros', {})}
            error={errors.outros?.message}
            onChange={() => {
              setEnableEdit(true)
            }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              style={{ backgroundColor: '#C2912E', color: '#fff' }}
              variant="outline"
              isDisabled={!enableEdit}
            >
              Alterar
            </Button>
          </Box>
        </form>
        {toastMessage && (
          <Toast
            title={toastMessage.title}
            description={toastMessage.message}
            status={toastMessage.status}
            isShow={!!toastMessage}
          ></Toast>
        )}
      </SimpleGrid>
    </CardForm>
  )
}

export default OthersForm
