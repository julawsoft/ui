import { useEffect } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { Cake } from 'phosphor-react'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { CardEvent, CardEventProps } from '../../../components/CardEvent'
import { transformHomeCardAniversario } from '../transform'
import { homeCardAniversarioService } from '../../../services/Home/homeAniversario'
import { ErrorLocal } from '../../../components/ErrorLocal'

export function CardAniversarios() {
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
        const response = await homeCardAniversarioService()
        setData(transformHomeCardAniversario(response.data))
      } catch (error) {
        setError(true)
        setLoading(false)
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
                      isIcon={true}
                      userName={item.userName}
                      date={item.date}
                      days={item.days}
                      bgColor={item.bgColor}
                      bgColorIcon={item.bgColorIcon}
                    />
                  )
                })}
              </>
            ) : (
              <>
                <EmptyEvent
                  icon={<Cake size={22} />}
                  title={'Nenhum aniversariante...'}
                  bgColor={'#fffff'}
                />
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  )
}
