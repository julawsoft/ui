import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { CheckCircle, Eye, ListPlus, Pencil, Trash } from 'phosphor-react'
import { ReactNode } from 'react'
import PermissionGate from '../../hooks/permissionGate'
import { Roles } from '../../routes/roles'
import { getFirstAndLastName } from '../../utils/userName'

export interface CardEventRequestProps {
  icon: ReactNode
  userName: string
  date: string
  status: string
  duration: string
  borderBottonColor?: string
  bgColor?: '#0CBB67' | '#C2912E' | '#F75A68' | string
  canEditOrDelete: boolean
  disabelBtn: boolean
  handleAccept?: () => void
  handleEdit?: () => void
  handleDel?: () => void
  handleDetails?: () => void
}

export function CardEventRequest({
  icon,
  userName,
  date,
  status,
  duration,
  bgColor,
  borderBottonColor,
  canEditOrDelete,
  disabelBtn,
  handleAccept,
  handleEdit,
  handleDel,
  handleDetails,
}: CardEventRequestProps) {
  return (
    <Grid
      templateColumns="72px 1fr 100px"
      gap={1}
      width={'auto'}
      minWidth={'350px'}
      bgColor="#fff"
      borderRadius={8}
    >
      <GridItem w="100%">
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={bgColor}
          color={'white'}
          height={'100%'}
          width={'100%'}
          borderBottom={`6px solid ${borderBottonColor}`}
        >
          {icon}
        </Flex>
      </GridItem>
      <GridItem w="100%">
        <Flex flexDirection={'column'} px={2}>
          <Box fontSize={'16px'}>{getFirstAndLastName(userName)}</Box>
          <Box fontSize={'12px'}>{date ?? '-'}</Box>
          <Box fontSize={'12px'}>{`${duration ?? '-'} dia(s)`}</Box>
          <Box textTransform={'uppercase'} fontWeight={'medium'}>
            {status}
          </Box>
        </Flex>
      </GridItem>
      <GridItem w="100%">
        <Flex alignItems={'center'} justifyContent={'center'} height={'100%'}>
          {!disabelBtn ? (
            <Flex
              p={2}
              border={'1px solid #c3c3c3'}
              bgColor={'#C2912E'}
              color={'white'}
              borderRadius={16}
              gap={1}
            >
              <PermissionGate roles={[Roles.HOME.validaSolicitacaoColaborador]}>
                <Box
                  textAlign={'center'}
                  cursor={'pointer'}
                  _hover={{
                    color: 'teal.700',
                  }}
                  onClick={handleAccept}
                >
                  <CheckCircle size={20} />
                </Box>
              </PermissionGate>
              {canEditOrDelete ? (
                <>
                  <Box
                    cursor={'pointer'}
                    _hover={{
                      color: 'teal.700',
                    }}
                    onClick={handleEdit}
                  >
                    <Pencil size={20} />
                  </Box>
                </>
              ) : null}
              {canEditOrDelete || Roles.HOME.cancelarSolicitacaoColaborador ? (
                <>
                  <Box
                    cursor={'pointer'}
                    _hover={{
                      color: 'red.500',
                    }}
                    onClick={handleDel}
                  >
                    <Trash size={20} />
                  </Box>
                </>
              ) : null}
            </Flex>
          ) : (
            <>
              <Box
                cursor={'pointer'}
                _hover={{
                  color: 'yellow.700',
                }}
                onClick={() => 'ver datails da solicitacao'}
              >
                <Text onClick={handleDetails}><ListPlus  size={24} /></Text>
              </Box>
            </>
          )}
        </Flex>
      </GridItem>
    </Grid>
  )
}
