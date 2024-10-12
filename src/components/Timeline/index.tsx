import { UnorderedList, ListItem, Box, Flex, Text } from '@chakra-ui/react'
import { Check, Clock } from 'phosphor-react'
import { ITimeline } from '../../schema/Timeline'

interface TimelineProps {
  data: ITimeline[]
}

export function Timeline({ data }: TimelineProps) {
  return (
    <UnorderedList
      listStyleType="none"
      m="12px 0 0 0"
      display="flex"
      flexDir="column"
      gap={8}
    >
      {data.map((item) => {
        return (
          <ListItem display="flex" gap={2} alignItems="center" key={item.id}>
            <Box
              p={2}
              bg={item.isPast ? 'green.500' : 'transparent'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border={
                item.isActive
                  ? '2px solid #eaca8b'
                  : !item.isActive && !item.isPast
                  ? '1px dashed #ccc'
                  : 'none'
              }
            >
              {!item.isActive ? (
                <Check
                  color={
                    item.isActive
                      ? '#C2912E'
                      : !item.isPast && !item.isPast
                      ? '#ccc'
                      : '#fff'
                  }
                  weight="bold"
                />
              ) : (
                <Clock
                  color={
                    item.isActive
                      ? '#C2912E'
                      : !item.isPast && !item.isPast
                      ? '#ccc'
                      : '#fff'
                  }
                  weight="bold"
                />
              )}
            </Box>
            <Flex flexDir="column">
              <Text
                fontWeight="medium"
                color={
                  item.isActive
                    ? '#C2912E'
                    : !item.isActive && !item.isPast
                    ? '#ccc'
                    : '#000'
                }
              >
                {item.title}
              </Text>
            </Flex>
          </ListItem>
        )
      })}
    </UnorderedList>
  )
}
