import {
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ClipboardText, PencilSimple } from 'phosphor-react'
import { AddressProps } from '.'
import { isValidString } from '../../../utils'
export interface AddressDisplayProps extends AddressProps {
  onCopyToClipboard: () => void
}

export function AddressDisplay({
  onToggleEditMode,
  onCopyToClipboard,
  street,
  city,
  district,
}: AddressDisplayProps) {
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
              Endereço
            </Text>
          </Flex>
          <Spacer />
          <Flex
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
              icon={<ClipboardText size={24} />}
              onClick={onCopyToClipboard}
              _hover={{ bg: '#ebedf0' }}
              _active={{
                bg: '#ebedf0',
                transform: 'scale(0.95)',
              }}
            />
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
              Cidade
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(city) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(city) ? city : 'Ausente'}
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
              Distrito
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(district) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(district) ? district : 'Ausente'}
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
              Rua
            </Text>
            <Text
              color="#5A5A66"
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidString(street) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidString(street) ? street : 'Ausente'}
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </>
  )
}
