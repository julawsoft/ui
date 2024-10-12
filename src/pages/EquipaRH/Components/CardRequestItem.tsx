import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react'
import { StatusDetailsRequest } from '../../RequestDetails/Components/Status'
import { Loader } from '../../../components/Loader'
import { DisplayDate } from '../../RequestDetails/util'

type CardRequestItemType = {
  name: string
  image: string
  role: string
  requestType: string
  duration: string
  detalhe: string
  status: string
  statusColor: string
  created: string
  handleClickCard: () => void
  isLoading: boolean
}

export function CardRequestItem({
  name,
  image,
  role,
  requestType,
  duration,
  detalhe,
  status,
  statusColor,
  created,
  handleClickCard,
  isLoading,
}: CardRequestItemType) {

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <Card
          bgColor={'white'}
          border={"1px solid #c3c3c3"}
          cursor={'pointer'}
          _hover={{
            bgColor: '#D4B26C',
            color: '#323232',
          }}
          title="Ver mais detalhes"
          onClick={handleClickCard}
        >
          <CardHeader pb={0}>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={name} src={image} border={'.6px solid #C2912E '} />
                <Box>
                  <Heading size="sm">{name}</Heading>
                  <Text fontSize={10}>{role}</Text>
                </Box>
              </Flex>
              <Box>
                <StatusDetailsRequest status={status} fontSize="10px" />
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex flexDirection={'column'}>
              <Flex gap={2}>
                <Text fontWeight={'semibold'}>{requestType}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight={'regular'}>Duração: </Text>
                <Text>{duration}</Text>
              </Flex>
              <Flex gap={2}>
                <Text fontWeight={'regular'}>Detalhe: </Text>
                <Text>{detalhe}</Text>
              </Flex>
              <Flex gap={2} color={'gray.400'}>
                <Text fontWeight={'regular'}>Solicitou em: </Text>
                <Text>{DisplayDate(created)}</Text>
              </Flex>
            </Flex>
          </CardBody>
          <Divider />
        </Card>
      )}
    </>
  )
}
