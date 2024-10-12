import { Box, Flex } from '@chakra-ui/react'
import { User } from 'phosphor-react'
import { FC } from 'react'
import { Brand } from '../../../../../components/Brand'
import GeneralInformationForm from './form'
import { GeneralInformationProps } from './general-information.types'

const GeneralInformation: FC<GeneralInformationProps> = ({ employee }) => {
  return (
    <Flex
      flexDirection="row"
      style={{ padding: '32px', borderBottom: '1px solid #ccc' }}
    >
      <Box flex={2}>
        <Brand
          description="Preencha seus dados pessoais"
          title="Informações gerais"
          position="left"
          icon={<User size={28} color="#C2912E" />}
        />
      </Box>
      <Box flex={1}>
        <GeneralInformationForm employee={employee}></GeneralInformationForm>
      </Box>
    </Flex>
  )
}

export default GeneralInformation
