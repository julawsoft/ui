import { Box, Flex, Text } from '@chakra-ui/react'
import { Article } from 'phosphor-react'
import React, { ReactNode } from 'react'

export interface SectionHomeProps {
  title?: string
  bgColor?: string
  children?: ReactNode
  icon?: ReactNode
}

export function SectionHome({icon,  title, bgColor, children }: SectionHomeProps) {
  return (
    <Flex
      bgColor={bgColor ?? '#f2f2f2'}
      width={'100%'}
      flexDirection={'column'}
      gap={4}
      borderRadius={8}
      minH={'100px'}
      p={4}
      justifyContent={'center'}
    >
      <Flex justifyContent={'center'} gap={2} alignItems={'center'} borderBottom={'.5px solid #c3c3c3'}>
      <Box>
        {icon ?? <Article size={20} />}
      </Box>
      {title ? (
        <Box textAlign={'left'} width={'100%'}>
          <Text fontSize={'16px'} fontWeight={'medium'}>
            {title}
          </Text>
        </Box>
      ) : null}
      
      </Flex>
      <Box>{children}</Box>
    </Flex>
  )
}
