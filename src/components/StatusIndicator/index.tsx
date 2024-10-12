import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface StatusIndicatorProps {
  text: string
  color: 'red' | 'green' | 'orange' | 'grey'
}

const StatusIndicator: FC<StatusIndicatorProps> = ({ text, color }) => {
  return (
    <Flex>
      <div
        style={{
          backgroundColor: color,
          width: '10px',
          height: '10px',
          marginTop: '2px',
          marginRight: '5px',
          borderRadius: 50,
        }}
      ></div>
      <Text>{text}</Text>
    </Flex>
  )
}

export default StatusIndicator
