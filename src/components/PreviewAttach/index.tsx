import { useEffect } from 'react'
import { ErrorLocal } from '../ErrorLocal'
import { Flex, Modal, Text } from '@chakra-ui/react'
import { LoaderLocal } from '../LoaderLocal'
import useAsyncState from '../../hooks/use-async-state'

interface RequestItem {
  handleCloseModal: any
  attachName: string
  isOpen: boolean
}

export function PreviewAttach({
  handleCloseModal,
  attachName,
  isOpen,
}: RequestItem) {
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<string>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        setData('')
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <>
      <Modal isOpen={true} onClose={handleCloseModal}>
        <Flex width={'100%'} flexDirection={'column'} gap={2}>
          {error === true && !loading ? (
            <ErrorLocal message={message} reload={() => init()} />
          ) : loading ? (
            <>
              <LoaderLocal />
            </>
          ) : (
            <>
              <Flex
                flexDirection={'column'}
                gap={2}
                border={'1px solid #f2f2f2'}
                borderRadius={8}
                p={2}
              >
                {data ? (
                  <> Preview Attach {attachName}</>
                ) : (
                  <>
                    <Text>Empty Attach</Text>
                  </>
                )}
              </Flex>
            </>
          )}
        </Flex>
      </Modal>
    </>
  )
}
