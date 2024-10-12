import { Box, Flex } from '@chakra-ui/react'
import { User } from 'phosphor-react'
import { FC } from 'react'
import { Brand } from '../../../../../components/Brand'
import { CorporateInformationProps } from './corporate-information.types'
import CorporateInformationForm from './form'

const CorporateInformation: FC<CorporateInformationProps> = ({ employee }) => {
  return (
    <Flex
      flexDirection="row"
      style={{ padding: '32px', borderBottom: '1px solid #ccc' }}
    >
      <Box flex={2}>
        <Brand
          title="Informações corporativas"
          description="Adicione as informações corporativas do colaborador"
          position="left"
          icon={<User size={28} color="#C2912E" />}
        />
      </Box>
      <Box flex={1}>
        <CorporateInformationForm
          employee={employee}
        ></CorporateInformationForm>
      </Box>
    </Flex>
  )
}

export default CorporateInformation
