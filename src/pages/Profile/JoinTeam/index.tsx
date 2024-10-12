import { Box, Button, HStack, Select, Spacer, Text } from '@chakra-ui/react'
import { PlusCircle } from 'phosphor-react'
import CustomButton from '../CustomButton'

export interface Team {
  id: number
  name: string
}

export interface TeamProps {
  selectedTeam: Team | null
  teams: Array<Team>
  newTeam: () => void
  joinTeam: () => void
}

export function JoinTeam({
  selectedTeam,
  teams,
  newTeam,
  joinTeam,
}: TeamProps) {
  return (
    <Box
      w="100%"
      h="100%"
      p={2.5}
      borderRadius={10}
      overflow="hidden"
      border="1px solid #EDE5DD"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2.5}
      display="inline-flex"
    >
      <HStack
        alignSelf="stretch"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        p={2}
        gap={2.5}
      >
        <Text
          color="#5A5A66"
          fontSize="24px"
          fontFamily="Roboto"
          fontWeight="400"
        >
          Junte-se à tua equipe
        </Text>
        <Text
          color="#5A5A66"
          fontSize="15px"
          fontFamily="Roboto"
          fontWeight="600"
        >
          Seleciona uma equipe
        </Text>
        <HStack
          width={'100%'}
          alignItems={'start'}
          

        >
          <Select placeholder="Seleciona o tipo de contracto">
            {teams.map((team) => {
              return <option key={team.id}>{team.name}</option>
            })}
          </Select>
          <CustomButton
            title='Nova Equipa'
            icon={<PlusCircle />}
            onClick={joinTeam}
          />

          {/* <Button
            bg="#C2912E"
            color={'white'}
            leftIcon={<PlusCircle />}
            onClick={newTeam}
          >
            Nova Equipe
          </Button> */}
        </HStack>
        <Button
          bg="#C2912E"
          color={'white'}
          fontSize="20px"
          fontFamily="Roboto"
          fontWeight="400"
          onClick={joinTeam}
        >
          Junte-se à equipe
        </Button>
      </HStack>
    </Box>
  )
}
