import { Envelope } from 'phosphor-react'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { HeaderWithNav } from '../../components/Navs/HeaderWithNavs'
import { Calendar } from 'phosphor-react'
import { FaRegFilePdf } from 'react-icons/fa'
import { CardDocument } from './CardDocument'
import { CardAusencia } from './CardAusencia'

export function Title({ title }) {
  return (
    <Text textTransform={'uppercase'} fontWeight={'medium'}>
      {title}
    </Text>
  )
}
export function TitleValue({ value, link, params, onClick }) {
  return (
    <Text
      _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
      onClick={() => onClick(link, params)}
    >
      {value}
    </Text>
  )
}
export function TitleValueIcon({
  key,
  value,
  size,
  src,
  link,
  params,
  onClick,
}) {
  return (
    <Flex gap={2} alignItems={'center'} key={key}>
      <Avatar src={src} size={size}></Avatar>
      <TitleValue value={value} link={link} params={params} onClick={onClick} />
    </Flex>
  )
}
export function TitleBox({ children, mb }) {
  return (
    <Flex gap={2} flexDirection={'column'} mb={mb}>
      {children}
    </Flex>
  )
}

interface ICardUser {
  userName: string
  image: string
  userFunction: string
  email: string
  status: string
}

export function CardUser({
  userName,
  image,
  userFunction,
  email,
  status,
}: ICardUser) {
  return (
    <Flex
      width={'100%'}
      shadow={'md'}
      bgColor={'#fff'}
      border={'1px solid gray.50'}
      borderRadius={'6'}
      p={2}
    >
      <Flex
        p={2}
        gap={3}
        alignItems={'center'}
        color={'colab.sidebar'}
        width={'90%'}
        justifyContent={'space-between'}
      >
        <Flex gap={2}>
          <Avatar size={'lg'} name={userName} src={image}></Avatar>
          <Flex flexDirection={'column'}>
            <Text fontSize={'18px'} fontWeight={'medium'}>
              {userName}
            </Text>
            <Text fontSize={'11px'}>{userFunction}</Text>
            <Flex alignItems={'center'} gap={1}>
              <Envelope size={10} />
              <Text fontSize={'11px'}>{email}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Badge p={2} colorScheme={status === 'ACTIVE' ? 'green' : 'red'}>
            {status}
          </Badge>
        </Box>
      </Flex>
    </Flex>
  )
}

export function EquipaRH() {
  return (
    <Flex height={'100%'} flexDirection={'column'} bgColor={''}>
      <HeaderWithNav title={'Solicitações Gerais'} />
      <Flex width={'100%'} gap={2}>
        <>
          <Tabs width={'100%'}>
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'yellow.400' }}>
                <Flex gap={1}>
                  <Calendar size={28} /> Ausências
                </Flex>
              </Tab>
              <Tab _selected={{ color: 'white', bg: 'yellow.400' }}>
                <Flex gap={1}>
                  <FaRegFilePdf size={24} />
                  Documentos
                </Flex>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0} m={0}>
                <CardAusencia />
              </TabPanel>
              <TabPanel p={0} m={0}>
               <CardDocument />
              </TabPanel>
            </TabPanels>
          </Tabs>

        </>
      </Flex>
    </Flex>
  )
}
