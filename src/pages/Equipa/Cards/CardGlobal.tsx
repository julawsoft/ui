import { Button, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ICardGlobal {
  children: ReactNode
  showAll: boolean
  setShowAll: (show: boolean) => void
}

export function CardGlobal({ children, showAll, setShowAll }: ICardGlobal) {
  return (
    <>
      <Flex gap={2}>
        <Button
          bgColor={showAll ? 'gray.300' : '#C2912E'}
          color={'#ffffff'}
          size="sm"
          borderColor={'#C2912E'}
          _hover={{
            bg: '#1d212a',
            color: '#fff',
          }}
          onClick={() => setShowAll(false)}
        >
          Pendentes
        </Button>
        <Button
          bgColor={showAll ? '#C2912E' : 'gray.300'}
          color={'#ffffff'}
          borderColor={'#C2912E'}
          size="sm"
          _hover={{
            bg: '#1d212a',
          }}
          onClick={() => setShowAll(true)}
        >
          Todas
        </Button>
      </Flex>
      <Flex
        width={'100%'}
        minHeight={'250px'}
        justifyContent={'center'}
        alignItems={'start'}
      >
        {children}
      </Flex>
    </>
  )
}
