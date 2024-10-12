import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface IStepContainer {
  description: string
  children: ReactNode
}


export function StepContainer({ description, children }: IStepContainer) {
  return (
    <>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        minHeight={'200px'}
        borderRadius={8}
        justifyContent={'center'}
        width={'100%'}
      >
        {children}
      </Flex>
    </>
  )
}
