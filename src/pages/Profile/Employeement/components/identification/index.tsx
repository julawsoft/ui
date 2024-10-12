import { Box, Flex } from '@chakra-ui/react'
import { User } from 'phosphor-react'
import { FC } from 'react'
import { Brand } from '../../../../../components/Brand'
import IdentificationForm from './form'
import { IdentificationProps } from './identification.types'

const Identification: FC<IdentificationProps> = ({ employee }) => {
  return (
    <Flex
      flexDirection="row"
      style={{ padding: '32px', borderBottom: '1px solid #ccc' }}
    >
      <Box flex={2}>
        <Brand
          title="Número de identificação / Endereço"
          description="Adicione aqui o seu número de identificação."
          position="left"
          icon={<User size={28} color="#C2912E" />}
        />
      </Box>
      <Box flex={1}>
        <IdentificationForm employee={employee}></IdentificationForm>
      </Box>
    </Flex>
  )
}

export default Identification
