import { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react'

import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  Text,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name?: string
  label?: string
  variantBg?: 'white'
  icon?: ReactNode
  error?: any
  minDate?: string
  maxDate?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, icon, error, minDate, maxDate, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={'gray.700'} fontWeight="regular">
          {label}
        </FormLabel>
      )}
      <InputGroup size="lg" display="flex" flexDirection="column">
        {icon && (
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        )}

        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="yellow.300"
          color="gray.900"
          size="lg"
          ref={ref}
          {...rest}
          min={minDate ?? ''}
          max={maxDate ?? ''}
        />

        {!!error && (
          <Text color="#B71616" style={{ marginTop: '8px' }}>
            * {error.message}
          </Text>
        )}
      </InputGroup>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
