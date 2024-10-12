import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react'

interface PropsCard {
  name: string
  photo: string
  role: string
  status: string
  icon?: string
  value?: number
  description?: string
}

const CardHeaderUser = ({ name,photo, role, status, icon, value, description }: PropsCard) => {
  return (
    <Flex
          width={'100%'}
          justifyContent={'center'}
        >
          <Flex
            gap={3}
            alignItems={'center'}
            color={'colab.sidebar'}
            width={'100%'}
            justifyContent={'space-between'}
            px={10}
            py={4}
            bgGradient='linear(to-r, #D4B26C, #FCEECC)'
            boxShadow={'sm'}
            borderTopRadius={8}
            borderLeftRadius={8}
            borderBottomRadius={0}
          >
            <Flex gap={4}>
              <Avatar size={'md'} name={name} src={photo}></Avatar>
              <Flex flexDirection={'column'} justifyContent={'center'}>
                <Text fontSize={'18px'} fontWeight={'medium'}>
                  {name}
                </Text>
                <Text fontSize={'11px'}>
                  {role}
                </Text>
              </Flex>
            </Flex>
            <Box>
              <Badge
                p={2}
                colorScheme={'green'}
              >
                {status}
              </Badge>
            </Box>
          </Flex>
        </Flex>
      )}

export default CardHeaderUser
