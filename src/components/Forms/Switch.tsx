import {
  FormControl,
  FormLabel,
  Stack,
  Switch as SwitchInput,
} from '@chakra-ui/react'

interface SwitchProps {
  label: string
  name: string
  isChecked: boolean
  direction: 'column' | 'row'
  onChange?: any
}

export function Switch({
  label,
  name,
  isChecked,
  direction,
  onChange,
}: SwitchProps) {
  return (
    <Stack direction={direction}>
      <FormControl alignItems="center">
        <FormLabel
          htmlFor={name}
          mb="2"
          color={'gray.700'}
          fontWeight="regular"
        >
          {label}
        </FormLabel>

        <SwitchInput
          id={name}
          defaultChecked={isChecked}
          colorScheme="yellow"
          size="lg"
          onChange={onChange}
        />
      </FormControl>
    </Stack>
  )
}
