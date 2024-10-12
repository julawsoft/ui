import {
  Flex,
  HStack,
  Spacer,
  IconButton,
  VStack,
  Text,
} from '@chakra-ui/react'
import { PencilSimple } from 'phosphor-react'
import { ContactProps } from '.'
import { isValidString, isValidWebsite } from '../../../utils'

export interface ContactDisplayProps extends ContactProps {}
export function ContactDisplay({
  onToggleEditMode,
  phoneNumber,
  secPhoneNumber,
  loginEmail,
  personalEmail,
  website,
  x,
  linkedin,
}: ContactDisplayProps) {
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
              Contacto
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
              Numero de Telefone
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(phoneNumber) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(phoneNumber) ? phoneNumber : 'Ausente'}
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
              Numero de Telefone Secundario
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(secPhoneNumber) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(secPhoneNumber) ? secPhoneNumber : 'Ausente'}
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
              E-mail de Autenticação
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(loginEmail) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(loginEmail) ? loginEmail : 'Ausente'}
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
              E-mail Pessoal
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(personalEmail) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(personalEmail) ? personalEmail : 'Ausente'}
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
              website
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidWebsite(website) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidWebsite(website) ? website : 'Ausente'}
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
              X
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(x) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(x) ? x : 'Ausente'}
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
              Linkedin
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(linkedin) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(linkedin) ? linkedin : 'Ausente'}
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </>
  )
}
