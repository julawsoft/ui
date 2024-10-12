import {
  Flex,
  HStack,
  Spacer,
  IconButton,
  VStack,
  Text,
} from '@chakra-ui/react'
import { PencilSimple } from 'phosphor-react'
import { BasicInformationProps } from '.'
import { isValidDate, isValidString } from '../../../utils'

export type BasicInformationDisplayProps = BasicInformationProps

export function BasicInformationDisplay({
  onToggleEditMode,
  prefName,
  firstName,
  lastName,
  nationality,
  birthDate,
  gender,
}: BasicInformationDisplayProps) {
  return (
    <>
      <Flex
        width="100%"
        p={2.5}
        bg="white"
        borderRadius={10}
        overflow="hidden"
        border="1px solid #E5DACF"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="inline-flex"
      >
        <HStack
          alignSelf="stretch"
          p={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Flex justifyContent="flex-start" alignItems="center">
            <Text
              color="#5A5A66"
              fontSize={24}
              fontFamily="Roboto"
              fontWeight="400"
            >
              Informação Básica
            </Text>
          </Flex>
          <Spacer />
          <Flex
            width={54}
            height={45}
            borderRadius={5}
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            gap={2.5}
            display="flex"
          >
            <IconButton
              background={'#FFFFFF'}
              aria-label="Edit Element"
              border="1px solid #C2912E"
              color={'#C2912E'}
              icon={<PencilSimple size={24} />}
              onClick={onToggleEditMode}
              _hover={{ bg: '#ebedf0' }}
              _active={{
                bg: '#ebedf0',
                transform: 'scale(0.95)',
              }}
            />
          </Flex>
        </HStack>
        <VStack
          alignSelf="stretch"
          p={2}
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={2.5}
          display="flex"
        >
          <VStack
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            gap={1}
          >
            <Text
              color="#5A5A66"
              fontSize={16}
              fontFamily="Roboto"
              fontWeight="600"
              textTransform="uppercase"
            >
              Nome Completo
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(prefName) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(prefName) ? prefName : 'Ausente'}
            </Text>
          </VStack>
          <VStack
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            gap={1}
          >
            <Text
              color="#5A5A66"
              fontSize={16}
              fontFamily="Roboto"
              fontWeight="600"
              textTransform="uppercase"
            >
              Primeiro Nome
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(firstName) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(firstName) ? firstName : 'Ausente'}
            </Text>
          </VStack>
          <VStack
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            gap={1}
          >
            <Text
              color="#5A5A66"
              fontSize={16}
              fontFamily="Roboto"
              fontWeight="600"
              textTransform="uppercase"
            >
              Sobrenome
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(lastName) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(lastName) ? lastName : 'Ausente'}
            </Text>
          </VStack>
          <VStack
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            gap={1}
          >
            <Text
              color="#5A5A66"
              fontSize={16}
              fontFamily="Roboto"
              fontWeight="600"
              textTransform="uppercase"
            >
              Nacionalidade
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(nationality) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(nationality) ? nationality : 'Ausente'}
            </Text>
          </VStack>
          <VStack
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            gap={1}
          >
            <Text
              color="#5A5A66"
              fontSize={16}
              fontFamily="Roboto"
              fontWeight="600"
              textTransform="uppercase"
            >
              Data de Nascimento
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidDate(birthDate) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidDate(birthDate) ? String(birthDate) : 'Ausente'}
            </Text>
          </VStack>
          <VStack
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            gap={1}
          >
            <Text
              color="#5A5A66"
              fontSize={16}
              fontFamily="Roboto"
              fontWeight="600"
              textTransform="uppercase"
            >
              Genero
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(gender) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(gender) ? gender : 'Ausente'}
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </>
  )
}
