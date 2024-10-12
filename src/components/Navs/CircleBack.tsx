import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'
import { Box } from '@chakra-ui/react'

export function CircleBack() {
  const navigate = useNavigate()
  return (
    <Box
      border="2px"
      borderColor="gray.200"
      borderRadius={20}
      px={1}
      py={1}
      cursor="pointer"
    >
      <ArrowLeft
        size={20}
        color="#b3b5c6"
        onClick={() => {
          navigate(-1)
        }}
      />
    </Box>
  )
}
