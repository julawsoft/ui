import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  title?: string
  description?: string
  children: ReactNode
  align?: 'center' | 'right' | 'left'
  onClose: () => void
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | 'full'
  onClick?: any
}

export function Modal({
  isOpen,
  children,
  title,
  size = 'md',
  description,
  onClose,
  align = 'left',
}: ModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="2xl" fontFamily="Poppins" textAlign={align}>
            {title}
          </Text>
          <Text
            fontSize="md"
            fontWeight="normal"
            color="gray.500"
            textAlign={align}
          >
            {description}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody my={8} flexDirection="column">
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
