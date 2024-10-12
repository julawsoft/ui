import {
  Flex,
  HStack,
  Spacer,
  IconButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import { X } from 'phosphor-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ContactProps } from '.'

export interface ContactEditProps extends ContactProps {}

export function ContactEdit({
  onToggleEditMode,
  phoneNumber,
  secPhoneNumber,
  loginEmail,
  personalEmail,
  website,
  x,
  linkedin,
}: ContactEditProps) {
  const { register, handleSubmit } = useForm<ContactEditProps>()
  const onSubmit: SubmitHandler<ContactEditProps> = (data) => console.log(data)
  return (
    <>
      <Flex
        w="100%"
        p={2.5}
        bg="white"
        borderRadius={10}
        overflow="hidden"
        border="1px solid #E5DACF"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
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
              Editar Contactos
            </Text>
          </Flex>
          <Spacer />
          <Flex
            width={54}
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
              color={'#C2912E'}
              aria-label="Close Button"
              border="1px solid #C2912E"
              onClick={onToggleEditMode}
              icon={<X size={24} />}
              _hover={{ bg: '#ebedf0' }}
              _active={{
                bg: '#ebedf0',
                transform: 'scale(0.95)',
              }}
            />
          </Flex>
        </HStack>

        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <VStack w={'100%'} p={2} alignItems="flex-start" gap={2.5}>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  Numero de telefone
                </FormLabel>
                <Input {...register('phoneNumber')} type="text" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  Número de telefone Secundário
                </FormLabel>
                <Input {...register('secPhoneNumber')} type="text" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  E-mail de autenticação
                </FormLabel>
                <Input {...register('loginEmail')} type="email" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  E-mail Pessoal
                </FormLabel>
                <Input {...register('personalEmail')} type="email" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  Website
                </FormLabel>
                <Input {...register('website')} type="text" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  X
                </FormLabel>
                <Input {...register('x')} type="text" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  linkedin
                </FormLabel>
                <Input {...register('linkedin')} type="text" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <Button w={'100%'} mt={4} type="submit">
                  Salvar
                </Button>
              </FormControl>
            </VStack>{' '}
          </VStack>
        </form>
      </Flex>
    </>
  )
}
