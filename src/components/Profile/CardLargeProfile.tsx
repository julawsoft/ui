import { Avatar, Box, Flex, Grid, Text } from '@chakra-ui/react'

interface ICardLargeProfile {
  name: string
  image: string
  role: string
  email: string
  phone: string
  dateStart: string
}

export const CardLargeProfile = ({
  name,
  image,
  role,
  email,
  phone,
  dateStart,
}: ICardLargeProfile) => {
  return (
    <>
      <Grid
        templateColumns="auto 1fr"
        gap={4}
        width={'100%'}
        border={'1px solid #bfc7da'}
        shadow={'md'}
        borderTopRadius={5}
        borderLeftRadius={5}
        minH={'90px'}
      >
        <Box>
          <Avatar borderRadius={4} size={'2xl'} name={name} src={image} />
        </Box>
        <Box py={1}>
          <Flex flexDirection={'column'}>
            <Text fontSize={'1.4rem'} fontWeight={'medium'}>
              {name}
            </Text>
            <Text fontSize={'.9rem'}>{role}</Text>
          </Flex>
          <Flex mt={3} gap={4}>
            <Box>
              <Flex flexDirection={'column'}>
                <Text fontSize={'.7rem'}>Endereço de e-mail:</Text>
                <Text fontSize={'.7rem'}>Contacto Telefónico:</Text>
                <Text fontSize={'.7rem'}>Data de Inicío:</Text>
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection={'column'}>
                <Text fontSize={'.7rem'} color={'#1d212a'}>
                  {email ?? '- -'}
                </Text>
                <Text fontSize={'.7rem'} color={'#1d212a'}>
                  {phone ?? '- -'}
                </Text>
                <Text fontSize={'.7rem'} color={'#1d212a'}>
                  {dateStart ?? '- -'}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Grid>
    </>
  )
}
