import { ReactNode } from 'react'
import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  Text,
} from '@chakra-ui/react'

interface PopoverProps {
  trigger: ReactNode
  description: string
}

export function Popover({ description, trigger }: PopoverProps) {
  return (
    <ChakraPopover placement="top">
      <PopoverTrigger>
        <button type="button">{trigger}</button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          bg="gray.900"
          color="gray.50"
          border="2px solid #ccc"
          p={1}
        >
          <PopoverBody fontSize="14px" width="100%">
            <Text as="p">{description}</Text>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </ChakraPopover>
  )
}
