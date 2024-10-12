import { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react'

import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Textarea as ChakraTextarea,
  InputGroup,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'

interface TextareaProps extends ChakraTextareaProps {
  name: string
  label?: string
  variantBg?: 'white'
  error?: any
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, label, error = undefined, ...rest }, ref) => {
  return (
    <FormControl isInvalid={error !== undefined && error !== null}>
      {!!label && (
        <FormLabel htmlFor={name} color={'gray.700'} fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <InputGroup size="lg" display="flex" flexDirection="column">
        <ChakraTextarea
          id={name}
          name={name}
          focusBorderColor="yellow.300"
          color="gray.900"
          size="lg"
          ref={ref}
          resize="none"
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  )
}

export const Textarea = forwardRef(TextareaBase)
