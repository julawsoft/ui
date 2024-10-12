import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NavFloatProps {
  side: 'left' | 'right'
  children: ReactNode
}

export function NavFloat({ side, children }: NavFloatProps) {
  return (
    <>
      {side === 'left' ? (
        <Box
          display={'flex'}
          alignItems="center"
          position={'absolute'}
          left={6}
          gap={4}
        >
          {children}
        </Box>
      ) : (
        <Box
          display={'flex'}
          alignItems="center"
          position={'absolute'}
          right={6}
          gap={4}
        >
          {children}
        </Box>
      )}
    </>
  )
}
