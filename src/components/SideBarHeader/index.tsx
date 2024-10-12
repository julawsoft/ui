import { Box, Flex, Text } from '@chakra-ui/react'
import useColabContext from '../../context_api'

export interface SideBarHeaderProps {
  companyName: string
  handleActivate: () => void
}

export function SideBarHeader({
  companyName,
  handleActivate,
}: SideBarHeaderProps) {
  const { colabProvider } = useColabContext()
  return (
    <Flex
      flexDirection={'column'}
      p={4}
      gap={2}
      borderBottom={'1px solid #C2912E'}
    >
      <Box textAlign={'center'} fontSize={'18px'} color={'white'}>
        {companyName}
      </Box>
      {colabProvider.system.licenseType !== 'pay' ? (
        <>
          <Flex
            flexDirection={'column'}
            bgColor={'#FFEFCF'}
            color={'#25282A'}
            p={2}
            borderRadius={4}
          >
            <Text>
              Your free trial will expire in{' '}
              <Text fontWeight={'medium'}>3 days</Text>
            </Text>
            <Text
              onClick={handleActivate}
              cursor={'pointer'}
              textDecoration={'underline'}
            >
              Active now
            </Text>
          </Flex>
        </>
      ) : null}
    </Flex>
  )
}
