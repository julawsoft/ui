import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface ItemLinkRequesrProps {
  title: string
  color: string
  bgColor: string
  bgColorHover?: string
  handle: () => void
  icon: ReactNode
  paddgin?: number
}

export function ItemLinkRequest({
  title,
  color = 'white',
  bgColor = '#C2912E',
  bgColorHover = '#25282a',
  handle,
  icon,
  paddgin,
}: ItemLinkRequesrProps) {
  return (
    <Box
      color={color}
      p={paddgin}
      bgColor={bgColor}
      borderRadius={4}
      _hover={{
        bgColor: bgColorHover,
        cursor: 'pointer',
      }}
      title={title}
      onClick={handle}
    >
      {icon}
    </Box>
  )
}
