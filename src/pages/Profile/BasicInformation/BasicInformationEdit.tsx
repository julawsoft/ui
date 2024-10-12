import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BasicInformationProps } from '.'
import { X } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface BasicInformationEditProps extends BasicInformationProps {}

export function BasicInformationEdit({
  onToggleEditMode,
  prefName,
  firstName,
  lastName,
  nationality,
  birthDate,
  gender,
}: BasicInformationEditProps) {
  const { register, handleSubmit } = useForm<BasicInformationEditProps>()
  const onSubmit: SubmitHandler<BasicInformationEditProps> = (data: any) => console.log(data)

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
              Editar Informação Básica
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
          <VStack w={'100%'} p={2} alignItems="flex-start" gap={2}>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <FormLabel
                  color="#5A5A66"
                  fontSize={16}
                  fontFamily="Roboto"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  Nome Completo
                </FormLabel>
                <Input {...register('prefName')} type="text" />
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
                  Primeiro Nome
                </FormLabel>
                <Input {...register('firstName')} type="text" />
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
                  Sobrenome
                </FormLabel>
                <Input {...register('lastName')} type="text" />
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
                  Nacionalidade
                </FormLabel>
                <Input {...register('nationality')} type="text" />
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
                  Data de Nascimento
                </FormLabel>
                <Input {...register('birthDate')} type="date" />
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
                  Genero
                </FormLabel>
                <Input {...register('gender')} type="text" />
              </FormControl>
            </VStack>
            <VStack w={'100%'} alignItems="flex-start" gap={1}>
              <FormControl>
                <Button w={'100%'} mt={4} type="submit">
                  Salvar
                </Button>
              </FormControl>
            </VStack>
          </VStack>
        </form>
      </Flex>
    </>
  )
}
