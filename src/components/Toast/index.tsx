import { useToast } from '@chakra-ui/react'

interface PropsToast {
  title: string
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading'
  description: string
  isClosable?: boolean
  isShow: boolean
}

export function Toast({
  title,
  description,
  isClosable,
  isShow,
  status,
}: PropsToast) {
  const toast = useToast()
  const id = 'test-toast'

  return (
    <>
      {isShow && !toast.isActive(id)
        ? toast({
            id,
            title: `${title}`,
            description: `${description}`,
            status,
            duration: 3000,
            isClosable: true,
            position: 'top-right',
            containerStyle: {
              width: '300px',
              maxWidth: '100%',
            },
          })
        : ''}
    </>
  )
}

Toast.defaultProps = {
  status: 'success',
  isClosable: true,
}
