import { useEffect } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { ShoppingBagOpen } from 'phosphor-react'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { CardEvent, CardEventProps } from '../../../components/CardEvent'
import { homeCardFeriasService } from '../../../services/Home/homeFerias'
import { transformHomeCardFerias } from '../transform'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { GiPalmTree } from 'react-icons/gi'

export function CardFerias() {
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<CardEventProps[]>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardFeriasService()
        setData(transformHomeCardFerias(response.data))
      } catch (error) {
        setMessage(String(error))
        setError(true)
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
                {data.map((item: CardEventProps, index: number) => {
                  return (
                    <CardEvent
                      key={index}
                      icon={item.icon}
                      userName={item.userName}
                      date={item.date}
                      days={item.days}
                      bgColor={item.bgColor}
                    />
                  )
                })}
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
