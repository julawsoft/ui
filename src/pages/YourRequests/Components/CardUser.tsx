import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react"
import { Envelope } from "phosphor-react"

interface ICardUser {
    userName: string
    image: string
    userFunction: string
    email: string
    status: string
  }

export function CardUser({
    userName,
    image,
    userFunction,
    email,
    status,
  }: ICardUser) {
    return (
      <Flex
        width={'100%'}
        shadow={'md'}
        bgColor={'#fff'}
        border={'1px solid gray.50'}
        borderRadius={'6'}
        p={2}
      >
        <Flex
          p={2}
          gap={3}
          alignItems={'center'}
          color={'colab.sidebar'}
          width={'90%'}
          justifyContent={'space-between'}
        >
          <Flex gap={2}>
            <Avatar size={'lg'} name={userName} src={image}></Avatar>
            <Flex flexDirection={'column'}>
              <Text fontSize={'18px'} fontWeight={'medium'}>
                {userName}
              </Text>
              <Text fontSize={'11px'}>{userFunction}</Text>
              <Flex alignItems={'center'} gap={1}>
                <Envelope size={10} />
                <Text fontSize={'11px'}>{email}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box>
            <Badge p={2} colorScheme={status === 'ACTIVE' ? 'green' : 'red'}>
              {status}
            </Badge>
          </Box>
        </Flex>
      </Flex>
    )
  }
  