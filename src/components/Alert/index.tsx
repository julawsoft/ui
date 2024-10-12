import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

interface AlertProps {
  title: string
  description: string
  isOpen: boolean
  isLoading: boolean
  isRed?: boolean
  onClose: () => void
  onSubmit: () => void
}

export function Alert({
  isOpen,
  onClose,
  title,
  description,
  onSubmit,
  isLoading,
  isRed = false,
}: AlertProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button disabled={isLoading} ref={cancelRef} onClick={onClose}>
            Não
          </Button>
          <Button
            colorScheme={isRed ? 'red' : 'green'}
            ml={3}
            onClick={onSubmit}
            isLoading={isLoading}
          >
            Sim
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
