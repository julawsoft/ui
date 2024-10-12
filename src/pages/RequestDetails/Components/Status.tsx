import { Box } from '@chakra-ui/react'
import {
  chooseStatus,
  chooseStatusColor,
} from '../../../components/RequestForm/utils'
import { translate } from '../../../utils/language/pt'

interface IStatusDetails {
  status: string
  width?: string
  height?: string
  fontSize?: string
  p?: string
}

export function StatusDetailsRequest({
  status,
  width = 'auto',
  height = '25px',
  fontSize = '14px',
  p = '4px',
}: IStatusDetails) {
  return (
    <>
      <Box
        width={width}
        p={p}
        borderRadius={2}
        color={chooseStatusColor(status)}
        bgColor ={chooseStatus(status)}
        textAlign={'center'}
        height={height}
        fontSize={fontSize}
        fontWeight={'medium'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {translate(status)}
      </Box>
    </>
  )
}
