import { forwardRef, ForwardRefRenderFunction } from 'react'

import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  InputGroup,
  Text,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'

export interface SelectDataProps {
  description: string
  value: any
}

interface SelectProps extends ChakraSelectProps {
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
    label,
    data,
    variantBg,
    borderBg,
    placeholder = 'Seleccione uma opção',
    size = 'lg',
    onChange,
    defaultValue = '',
    error,
    ...rest
  },
  ref,
) => {
  return (
    <FormControl>
      {!!label && (
        <FormLabel htmlFor={name} color={'gray.700'} fontWeight="regular">
          {label}
        </FormLabel>
      )}
      <InputGroup size="lg" display="flex" flexDirection="column">
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
          {...rest}
        >
          <option value="" disabled key={0}>
            {placeholder}
          </option>
          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.description}
            </option>
          ))}
        </ChakraSelect>

        {!!error && (
          <Text color="#B71616" style={{ marginTop: '8px' }}>
            * {error.message}
          </Text>
        )}
      </InputGroup>
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
