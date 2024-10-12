import { useEffect } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import Swipper from '../../../components/Swipper'
import { INotesList } from '../../../schema/Notes'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { ShoppingBagOpen } from 'phosphor-react'
import { homeCardRequestInfoNotes } from '../../../services/Home/homeRequest'
import { transformHomeCardRequestInfoNotes } from '../transform'
import { GiPalmTree } from 'react-icons/gi'

export function CardInformativeNotes() {
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<INotesList[]>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        // setData(DataInformativeNotes as INotesList[])
        const response = await homeCardRequestInfoNotes()
        setData(transformHomeCardRequestInfoNotes(response.data))
        setLoading(false)
      } catch (error) {
        setError(true)
        setMessage(String(error))
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
      height={'350px'}
      position={'relative'}
      border={'0.1px solid #c3c3c3'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex width={'100%'} height={'100%'} position={'absolute'}>
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
                <Swipper data={data} />
              </>
            ) : (
              <>
                <EmptyEvent
                  icon={<GiPalmTree size={22} />}
                  title={'Nenhum funcionário ausente por férias'}
                  bgColor={'#ffffff'}
                />
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  )
}
