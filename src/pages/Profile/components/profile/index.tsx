import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { Brand } from '../../../../components/Brand'
import { EmployDTO } from '../../../../services/Employee/get-employee-by-id.service'
import { useForm } from 'react-hook-form'
import { Buildings } from 'phosphor-react'
import { ProfileHeader } from './components/header/profileHeader'
import { Employee } from '../../../../constants/entities/employee'
import { CardForm } from '../../../../components/Forms/CardForm'
import { Input } from '../../../../components/Forms/Input'
import { ProfileForm } from './components/form/profileForm'

export const Profile = ({
  employee,
  onPhotoChange,
}: {
  employee: EmployDTO
  onPhotoChange: () => void
}) => {
  const { register } = useForm()

  return (
    <>
      {
        <Flex
          flexDirection="column"
          style={{ padding: '32px', paddingTop: '65px', width: '100%' }}
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            borderBottom="1px solid #ccc"
            justifyContent="space-between"
            gap={{ base: 14, lg: 2 }}
          >
            <Box flex="2">
              <Brand
                title="Informação de Trabalho"
                description="Informações básicas sobre a tua função"
                icon={<Buildings size={28} color="#C2912E" />}
                position="left"
              />
            </Box>

            <Box flex="1" paddingTop="65px" paddingBottom="34px">
              <Box
                bg="#F2F2F2"
                style={{ borderRadius: '8px', textAlign: 'center' }}
              >
                {employee && (
                  <>
                    <ProfileHeader
                      id={employee[Employee.id]}
                      image={employee[Employee.image]}
                      name={employee[Employee.name]}
                      position={
                        employee[Employee.function]
                          ? employee[Employee.function].name
                          : 'Não informada'
                      }
                      onPhotoChange={onPhotoChange}
                    ></ProfileHeader>
                    <ProfileForm employee={employee}></ProfileForm>
                  </>
                )}
              </Box>
            </Box>
          </Flex>
          <Flex flexDirection="row">
            <Box flex={2}>
              <Brand
                title="Ausências"
                description="O superior hierárquico é a pessoa responsável por rever as suas solicitações de ausências"
                icon={<Buildings size={28} color="#C2912E" />}
                position="left"
              />
            </Box>
            <Box flex={1}>
              <CardForm>
                <SimpleGrid spacing={4}>
                  <Input
                    label="Superior Hierárquico"
                    type="text"
                    isDisabled
                    backgroundColor={'white'}
                    borderColor={'gray.100'}
                    {...register('superior-hierarquico', {
                      required: 'Campo obrigatório',
                    })}
                    value={employee[Employee.manager]}
                  />
                </SimpleGrid>
              </CardForm>
            </Box>
          </Flex>
        </Flex>
      }
    </>
  )
}
