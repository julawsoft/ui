import { useEffect } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { homeCardActivityService } from '../../../services/Home/homeActivity'
import { transformHomeCardActivity } from '../transform'
import { ErrorLocal } from '../../../components/ErrorLocal'
import CalendarComponent from '../../../components/Calendar'
import { ActivityLogProps } from '../../../components/ActivityLog'
import 'react-calendar/dist/Calendar.css'

export function CardCalendar() {
  const { loading, setLoading, error, setError, setData, message, setMessage } =
    useAsyncState<ActivityLogProps[]>()

  useEffect(() => {
    // init()
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
    <Flex width={'100%'}>
      <Flex width={'100%'} gap={2} flexWrap={'wrap'}>
        {error === true && !loading ? (
          <ErrorLocal message={message} reload={handleReload} />
        ) : loading ? (
          <>
            <LoaderLocal />
          </>
        ) : (
          <>
            <CalendarComponent />
          </>
        )}
      </Flex>
    </Flex>
  )
}
