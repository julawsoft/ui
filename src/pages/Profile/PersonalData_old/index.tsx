import { FC } from 'react'

import { IEmployee } from '../../../schema/Employee'
import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { BasicInformation } from '../BasicInformation'
import { Address } from '../Address'
import { Contact } from '../Contact'
import { StartDate } from '../StartDate'
import { VisaExpiryDate } from '../VisaExpiryDate'

interface PersonalDataProps {
  employee: IEmployee
}

const PersonalData: FC<PersonalDataProps> = ({ employee }) => {
  return (
    <>
      <Flex
        w={'100%'}
        alignItems={'start'}
        gap={6}
        justifyContent={'space-between'}
      >
        <VStack w={'100%'} spacing={0} rowGap={4} alignItems={'start'}>
          <HStack w={'inherit'} spacing={4}>
            <Text
              width="100%"
              color="#1E1E1E"
              fontSize="32px"
              fontFamily="Roboto"
              fontWeight="600"
              lineHeight="44.8px"
            >
              Dados Pessoais
            </Text>
          </HStack>
          <HStack
            w={'inherit'}
            spacing={0}
            alignItems={'start'}
            justifyContent="space-evenly"
          >
            <VStack spacing={4}>
              <BasicInformation />
              <Address
                street={''}
                district={''}
                city={''}
                onToggleEditMode={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </VStack>
            <VStack spacing={4}>
              <Contact />
            </VStack>
            <VStack spacing={4}>
              <StartDate />
              <VisaExpiryDate />
            </VStack>
          </HStack>
        </VStack>
      </Flex>
    </>
  )
}

export default PersonalData
