import { Flex } from '@chakra-ui/react'
import Calendar from 'react-calendar'

const CalendarComponent = () => {
  const formatShortWeekday = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 3)
  }

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Calendar
        formatShortWeekday={formatShortWeekday}
        onChange={(e) => console.log(e)}
        value={new Date()}
      />
    </Flex>
  )
}

export default CalendarComponent
