import { useEffect } from 'react'
import useAsyncState from '../../hooks/use-async-state'
import { EmptyEvent } from '../../components/EmptyEvent'
import { ShoppingBagOpen } from 'phosphor-react'
import { Flex, Text } from '@chakra-ui/react'
import { ErrorLocal } from '../../components/ErrorLocal'
import { LoaderLocal } from '../../components/LoaderLocal'
import { toast } from 'react-toastify'
import { GiPalmTree } from 'react-icons/gi'

export function HomeRH() {
  const { loading, setLoading, error, setError, data, setData, message } =
    useAsyncState<any[]>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        setData([])
        setError(false)
      } catch (error) {
        toast.error(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleReload = () => {
    init()
  }

  return (
    <Flex
      width={'100%'}
      position={'relative'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex width={'100%'} gap={2} flexWrap={'wrap'}>
        {error === true && !loading ? (
          <ErrorLocal message={message} reload={handleReload} />
        ) : loading ? (
          <>
            <LoaderLocal />
          </>
        ) : (
          <>
            {data && data.length ? (
              <>
                <Text>Cards</Text>
              </>
            ) : (
              <>
                <EmptyEvent
                  icon={<GiPalmTree size={22} />}
                  title={'Nenhum funcionário ausente por doença'}
                  bgColor={'transparent'}
                />
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  )
}
