import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { IEmployee, IManager } from '../../../schema/Employee'
import { Modal } from '../../../components/Forms/Modal'
import { ChangeEvent, useState } from 'react'
import { convertDataToSelect } from '../../../utils/convertDataToSelect'
import { getEmployees } from '../../../services/Employee/get-employees.service'
import { toast } from 'react-toastify'
import { Select } from '../../../components/Forms/Select'
import { updateLineManager } from '../../../services/Employee/updateLineManager'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { LANGUAGES } from '../../../utils/language'
import { Roles } from '../../../routes/roles'
import PermissionGate from '../../../hooks/permissionGate'
import { Pencil } from 'phosphor-react'

export interface ManagerProps {
  manager?: IManager
}

function Manager({ manager }: ManagerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false)
  const [data, setData] = useState<IEmployee[]>([])
  const [idSHSelected, setIdSHSelected] = useState<number>(0)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const buttonAction = () => {
    getListEmployees()
    setIsOpen(true)
  }

  const getListEmployees = () => {
    setIsLoadingModal(true)
    setTimeout(async () => {
      try {
        const response = await getEmployees({
          departmants: undefined,
          categories: undefined,
          status: undefined,
          employee: undefined,
        })
        setData(response)
        setIsLoadingModal(false)
      } catch (error) {
        setMessage(String(error))
        setIsError(true)
        toast.error(String(error))
      } finally {
        setIsLoadingModal(false)
      }
    }, 1000)
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value
    setIdSHSelected(Number(value))
  }

  const handleSaveChefiaDirecto = () => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await updateLineManager(
          Number(idSHSelected),
          Number(manager?.id),
          null,
        )
        if(response){

          if (response.response.statusCode === 200) {
            setIsLoadingModal(false)
            toast.success('Chefia directo definido com Sucesso!')
            setIsOpen(false)
          } else {
            toast.error(response.response.message)
          }
        }
      } catch (error) {
        toast.error(String(error))
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleReload = () => {
    getListEmployees()
  }

  return (
    <>
      <Box
        w="100%"
        p={4}
        bg="#EDE6DE"
        borderRadius={10}
        overflow="hidden"
        border="1px solid #E5DACF"
        display="inline-flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={2}
        h={'100%'}
      >
        <Flex
          alignSelf="stretch"
          p={4}
          gap={8}
          align="flex-start"
          flexDirection={'column'}
        >
          <Flex justifyContent={'space-between'} width={'100%'}>
            <Text
              color="#5A5A66"
              fontSize="18px"
              fontFamily="Roboto"
              fontWeight="400"
              lineHeight="25.2px"
              wordBreak="break-word"
            >
              {manager?.lineManager
                ? LANGUAGES.SEU_CHEFIA_DIRECTO
                : LANGUAGES.VOCE_NAO_TEM_GERENTE_DEFINIDO}
            </Text>
            <PermissionGate roles={[Roles.PROFILE.can_change_line_manager]}>
              <Box
                textAlign={'center'}
                cursor={'pointer'}
                _hover={{
                  color: 'teal.700',
                }}
                onClick={buttonAction}
                title={LANGUAGES.ALTERAR_O_CHEFIA_DIRECTO}
              >
                <Pencil size={24} />
              </Box>
            </PermissionGate>
          </Flex>

          {manager?.lineManager ? (
            <Box
              width="100%"
              height="100%"
              px={4}
              py={2}
              background="rgba(255, 255, 255, 0.44)"
              borderRadius={6}
              overflow="hidden"
              border="1px solid #C2912E"
              display="inline-flex"
              color="#C2912E"
              fontSize="20px"
              fontFamily="Roboto"
              fontWeight="600"
            >
              <Flex flexDirection={'column'}>
                <Text>{manager.lineManager.name}</Text>
                <Text fontSize={12}>
                  {manager.lineManager
                    ? manager.lineManager.role
                    : 'Nenhuma função'}
                </Text>
              </Flex>
            </Box>
          ) : (
            <PermissionGate roles={[Roles.PROFILE.can_set_line_manager]}>
              <Button
                width="100%"
                height="100%"
                px={4}
                py={2}
                background="rgba(255, 255, 255, 0.44)"
                borderRadius={6}
                overflow="hidden"
                border="1px solid #C2912E"
                justifyContent="center"
                alignItems="center"
                display="inline-flex"
                color="#C2912E"
                fontSize="20px"
                fontFamily="Roboto"
                fontWeight="600"
                onClick={buttonAction}
              >
                Definir o seu Gerente
              </Button>
            </PermissionGate>
          )}
        </Flex>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Lista dos Líderes da Empresa"
        description="Define o Líder directo do Colaborador."
        size={'lg'}
      >
        {isLoadingModal && !isError ? (
          <SpinnerProgress title="Carregando... Aguarde" />
        ) : (
          <>
            {isError ? (
              <ErrorLocal message={message} reload={handleReload} />
            ) : (
              <>
                <Flex gap={4} flexDirection={'column'}>
                  <Select
                    label="Líderança directa"
                    data={convertDataToSelect(data, 'name')}
                    onChange={handleSelectChange}
                  />
                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Enviando..."
                    onClick={handleSaveChefiaDirecto}
                  >
                    Definir
                  </Button>
                </Flex>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export { Manager }
