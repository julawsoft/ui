import { useEffect } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { ITimeOff } from '../../../schema/HomeCard'
import { TimeOff } from '../../../components/TimeOff'
import { TotalAllowance } from '../../../components/TotalAllowance'
import { homeCardTimeOffService } from '../../../services/Home/timeOff'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { TEXT_FOR_HOME_PAGE } from '../utils'

interface CarTimeOffProps {
  userId: number
}
export function CardTimeOff({ userId }: CarTimeOffProps) {
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<ITimeOff>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardTimeOffService()
        setData(response.data)
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
      <Flex width={'100%'} flexDirection={'column'} gap={4}>
        {error === true && !loading ? (
          <ErrorLocal message={message} reload={handleReload} />
        ) : loading ? (
          <>
            <LoaderLocal />
          </>
        ) : (
          <>
            <TimeOff
              approved={Number(data?.approved ?? 0)}
              pending={Number(data?.pending ?? 0)}
              remaining={Number(data?.remainder ?? 0)}
              startDate={data?.timeOff ?? ''}
            />
            <TotalAllowance
              title={TEXT_FOR_HOME_PAGE.TOTAL_ALLOWANCE}
              total={Number(data?.allowedDays ?? 0)}
              bgColor="#fff"
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}
