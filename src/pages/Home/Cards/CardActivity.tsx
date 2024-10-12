import { useEffect } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { Clock } from 'phosphor-react'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { ActivityLog, ActivityLogProps } from '../../../components/ActivityLog'
import { homeCardActivityService } from '../../../services/Home/homeActivity'
import { transformHomeCardActivity } from '../transform'
import { ErrorLocal } from '../../../components/ErrorLocal'

export function CardActivity() {
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<ActivityLogProps[]>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardActivityService()
        setData(transformHomeCardActivity(response.data))
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
                {data.map((item: ActivityLogProps, index: number) => {
                  return (
                    <ActivityLog
                      key={index}
                      icon={item.icon}
                      description={item.description}
                    />
                  )
                })}
              </>
            ) : (
              <>
                <EmptyEvent
                  icon={<Clock size={22} />}
                  title={'Nenhuma actividade...'}
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
