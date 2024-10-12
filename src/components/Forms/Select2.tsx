import { forwardRef, ForwardRefRenderFunction } from 'react'

import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react'

export interface SelectDataProps {
  description: string
  value: any
}

interface SelectProps extends ChakraInputProps {
  name?: string
  label?: string
  data: SelectDataProps[]
  variantBg?: 'white' | 'gray.50'
  borderBg?: 'gray.100' | 'gray.50'
  onChange?: any
  placeholder?: string
  size?: 'lg' | 'md' | 'sm' | 'xs'
  error?: any
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    name,
    error,
    label,
    data,
    variantBg,
    borderBg,
    placeholder = 'Seleccione uma opção',
    size = 'lg',
    onChange,
    defaultValue = '',
    ...rest
  },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={'gray.700'} fontWeight="regular">
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        id={name}
        name={name}
        size={size}
        focusBorderColor="yellow.300"
        borderColor={borderBg}
        bg={variantBg}
        ref={ref}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {data.map((item) => (
          <option key={item.value} value={item.value}>
            {item.description}
          </option>
        ))}
      </ChakraSelect>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
