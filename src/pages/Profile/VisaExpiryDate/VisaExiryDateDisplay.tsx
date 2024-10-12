import {
  Flex,
  HStack,
  Spacer,
  IconButton,
  VStack,
  Text,
} from '@chakra-ui/react'
import moment from 'moment'
import { PencilSimple } from 'phosphor-react'
import { VisaExpiryDateProps } from '.'
import { isValidDate } from '../../../utils'

export interface VisaExiryDateDisplayProps extends VisaExpiryDateProps {}

export function VisaExiryDateDisplay({
  onToggleEditMode,
  expiryDate
}: VisaExiryDateDisplayProps) {
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
              Data de Validade do Visto
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
              fontSize={20}
              fontFamily="Roboto"
              fontStyle={isValidDate(expiryDate) ? 'normal' : 'italic'}
              fontWeight="400"
            >
              {isValidDate(expiryDate)
                ? moment(expiryDate).format('DD/MM/YYYY')
                : 'Ausente'}
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </>
  )
}
