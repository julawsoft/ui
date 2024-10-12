import { Container } from './styled'

import img from '../../assets/images/empty/no_data.png'
import { Flex } from '@chakra-ui/react'

interface PropsEmpty {
  title: string
}

export default function Empty({ title }: PropsEmpty) {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <img src={img} width={'100px'} />
      <p>{title || 'Nenhum dado encontrado'}</p>
    </Flex>
  )
}
