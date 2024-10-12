import { StatusTable } from '../../components/StatusTable'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { IEmployee } from '../../schema/Employee'
import { PaperPlaneTilt } from 'phosphor-react'
import PermissionGate from '../../hooks/permissionGate'
import { Roles } from '../../routes/roles'
import { MdLockOpen } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import SpinnerProgress from '../../components/SpinnerProgress'
export const columns: any = [
  {
    id: 'id',
    name: '#',
    isSortable: true,
  },
  {
    id: 'colaborador',
    name: 'Colaborador(a)',
    isSortable: true,
  },
  {
    id: 'category',
    name: 'Categoria',
    isSortable: true,
  },
  {
    id: 'department',
    name: 'Departamento',
    isSortable: true,
  },
  {
    id: 'manager',
    name: 'Líder',
    isSortable: true,
  },
  {
    id: 'home',
    name: 'Anos de Casa',
    isSortable: true,
  },
  {
    id: 'status',
    name: 'Estado',
    isSortable: true,
  },
  {
    id: 'invite',
    name: 'Invite',
    isSortable: true,
  },
]

export function dataTransform(
  data: IEmployee[],
  handleClickEmployee,
  handleSendInvite,
  handleChangeStatusColaborador,
  isChangeStatus,
  isChangeStatusId,
) {

  console.log(isChangeStatus)
  console.log(isChangeStatusId)

  const checkInvite = (item: IEmployee) => {
    if (item.TokenInvite) {
      if (item.TokenInvite.is_activated) {
        return (
          <Text fontSize={'13px'} fontWeight={'bold'} color={'green'}>
            Aceite
          </Text>
        )
      } else {
        if (item.TokenInvite.was_invited) {
          return (
            <Flex alignItems={'center'} gap={2}>
              <Text fontSize={'13px'} fontWeight={'bold'} color={'gray'}>
                Enviado
              </Text>
              <Text title="Reenviar o convite">
                <PaperPlaneTilt
                  cursor={'pointer'}
                  size={18}
                  color="red"
                  onClick={() => handleSendInvite(item.Contact.email)}
                />
              </Text>
            </Flex>
          )
        } else {
          return (
            <Text title="Enviar convite">
              <PaperPlaneTilt
                cursor={'pointer'}
                size={22}
                color="#c3912e"
                onClick={() => handleSendInvite(item.Contact.email)}
              />
            </Text>
          )
        }
      }
    } else {
      return ''
    }
  }

  return data.length
    ? data.map((item: IEmployee, key: number) => ({
      id: key + 1,
      colaborador: (
        <Flex
          onClick={() => handleClickEmployee(item.id)}
          gap={3}
          cursor={'pointer'}
          title="Ver Perfil do Colaborador"
        >
          <Avatar name={item.name} src={item.photo} size={'sm'} />
          <Flex flexDirection={'column'}>
            <Text fontWeight={'medium'}>{item.name}</Text>
            <Text color={'gray.400'}>
              {item.Contract[0] && item.Contract[0].Role
                ? item.Contract[0].Role.description
                : 'Nenhuma função'}
            </Text>
          </Flex>
        </Flex>
      ),

      // id do manager e do departamento
      // se nao informado nao tem link
      category: (
        <Text>
          {item.Contract[0] && item.Contract[0].Category ? (
            <Text>{item.Contract[0].Category.description}</Text>
          ) : (
            'Não informado'
          )}
        </Text>
      ),
      department: (
        <Text
          title={
            item.Organogram ? item.Organogram.description : 'Não informado'
          }
        >
          {item.Organogram ? (
            <Text>{item.Organogram.description}</Text>
          ) : (
            'Não informado'
          )}
        </Text>
      ),
      manager: (
        <Text>
          {item.LineManager ? (
            <Text
              title="Ver Perfil do Manager"
              _hover={{
                textDecoration: 'underline',
                borderBottomColor: '#c2922e',
              }}
              cursor={'pointer'}
              onClick={() => handleClickEmployee(item.LineManager.id)}
            >
              {item.LineManager.Employee_Manager.name}
            </Text>
          ) : (
            ' - '
          )}
        </Text>
      ),
      home: (
        <Flex>
          <Text color={'yellow.400'} fontSize={'13px'} fontWeight={'bold'}>
            {item.HomeTime}
          </Text>
        </Flex>
      ),
      status: (
        <Flex gap={2} alignItems={'center'}>
          <StatusTable
            key={key}
            status={Number(item.status === 'ACTIVE' ? 2 : 3)}
            description={`${item.status}`}
          />
          <PermissionGate roles={[Roles.PEOPLE.can_change_status_employee]}>
            {
              isChangeStatus && isChangeStatusId === item.id ? (null) : (
                <>
                  {
                    item.status === 'ACTIVE' ?
                      <Box cursor={'pointer'} title='Inactivar Coloborador' onClick={() => handleChangeStatusColaborador(item, 0)}>
                        <MdLockOutline fontSize={14} color={'red'} />
                      </Box> :
                      <Box cursor={'pointer'} title="Activar Colaborador" onClick={() => handleChangeStatusColaborador(item, 1)}>
                        <MdLockOpen fontSize={14} color={'green'} />
                      </Box>
                  }
                </>
              )
            }
          </PermissionGate>
        </Flex>
      ),
      invite: (
        <PermissionGate roles={[Roles.PEOPLE.can_send_invite_employee]}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            {checkInvite(item)}
          </Flex>
        </PermissionGate>
      ),
    }))
    : []
}
