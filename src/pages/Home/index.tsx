import { useState } from 'react'
import { Welcome } from '../../components/Welcome'
import { CalendarCheck, Cake, Bed, ShoppingBagOpen, ListDashes } from 'phosphor-react'
import { Box, Flex, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { MdOutlineHealing } from "react-icons/md";
import { GiPalmTree } from "react-icons/gi";
import { MdOutlineHistory } from "react-icons/md";

import { ItemLinkRequest } from '../../components/ItemLinkRequest'
import { SectionHome } from '../../components/SectionHome'
import { CardAniversarios } from './Cards/CardAniversarios'
import { CardSaude } from './Cards/CardSaude'
import { CardFerias } from './Cards/CardFerias'
import { CardActivity } from './Cards/CardActivity'
import { CardRequestUser } from './Cards/CardRequestUser'
import { CardTimeOff } from './Cards/CardTimeOff'
import useColabContext from '../../context_api'
import { CurrentDateTime } from '../../components/CurrentDateTime'
import { RequestForm } from '../../components/RequestForm'
import { Modal } from '../../components/Forms/Modal'
import { CardInformativeNotes } from './Cards/CardInformativeNotes'
import { FaRegFilePdf } from "react-icons/fa";

import { TEXT_FOR_HOME_PAGE } from './utils'
import { RequestFormDocument } from '../../components/RequestFormDocument';
import { CardRequestUserDocumets } from './Cards/CardRequestUserDocumets';

export interface IValueEditModal {
  id: number
  typeId: number
  description: string
}

let initialValueEditModal = { id: 0, typeId: 0, description: '' }

export function Home() {

  const { colabProvider } = useColabContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenModalDocument, setIsOpenModalDocument] = useState<boolean>(false)
  const [valueEditModal, setValueEditModal] = useState<IValueEditModal>(initialValueEditModal)

  const handleCallModalRequest = () => {
    handleOpenModal()
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleCallModalDocument = () => {
    setIsOpenModalDocument(true)
  }

  const handleCloseModalDocument = () => {
    setIsOpenModalDocument(false)
    setValueEditModal(initialValueEditModal)
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      <Flex minHeight={'100%'} width={'100%'} flexDirection={'column'} gap={4}>
        <Flex justifyContent={'space-between'} gap={2} width={'100%'} mb={2}>
          <Box>
            <Welcome
              iconUser={colabProvider.user.image}
              userName={colabProvider.user.name ?? 'Usuário não definido'}
              date={<CurrentDateTime />}
              bgColor="#f2f2f2"
            />
          </Box>
          <Box>
            <Flex
              bgColor={'transparent'}
              width={'100px'}
              height={'52px'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={8}
              gap={2}
            >
              <ItemLinkRequest
                title={'Faça uma solicitação'}
                color={'white'}
                bgColor={'#C2912E'}
                bgColorHover={'#D4B26C'}
                icon={<CalendarCheck size={24} />}
                handle={() => handleCallModalRequest()}
                paddgin={2}
              />
              <ItemLinkRequest
                title={'Solicitar um documento'}
                color={'white'}
                bgColor={'#C2912E'}
                bgColorHover={'#D4B26C'}
                icon={<FaRegFilePdf  size={24} />}
                handle={() => handleCallModalDocument()}
                paddgin={2}
              />
            </Flex>
          </Box>
        </Flex>
        <Grid
          templateColumns={isMobile ? '1fr' : '2fr 1fr'}
          color={'#15171C'}
          gap={6}
        >
          <GridItem w="100%">
            <Flex
              flexDirection={'column'}
              gap={4}
              bgClip={'red'}
              width={'100%'}
            >
              <CardInformativeNotes />
              <SectionHome
                icon={<MdOutlineHealing size={25} color='#CC9926' />}
                title={TEXT_FOR_HOME_PAGE.ABSENT}
                bgColor={'#F6F2E9'}
              >
                <CardSaude />
              </SectionHome>
              <SectionHome icon={<GiPalmTree size={25} fill='#CC9926' />} title={TEXT_FOR_HOME_PAGE.VOCATION} bgColor={'#F3F4F6'}>
                <CardFerias />
              </SectionHome>
              <SectionHome icon={<Cake size={25} color='#CC9926' />} title={TEXT_FOR_HOME_PAGE.BIRTHDAY} bgColor={'#F6F2E9'}>
                <CardAniversarios />
              </SectionHome>
              <SectionHome icon={<MdOutlineHistory size={25} color='#CC9926' />} title={TEXT_FOR_HOME_PAGE.ACTIVIDADE} bgColor={'#F3F4F6'}>
                <CardActivity />
              </SectionHome>
              {/* <SectionHome title={''} bgColor={''}>
                <SwipperCard />
              </SectionHome> */}
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              flexDirection={'column'}
              width={'100%'}
              gap={6}
              mb={4}
              bgColor={'#f2f2f2'}
              padding={4}
              borderRadius={6}
            >
              <CardRequestUser userId={colabProvider.user.id} />
              <CardRequestUserDocumets
                userId={colabProvider.user.id}
                setValueEditModal={setValueEditModal}
                handleCallModalDocument={handleCallModalDocument}
              />
              <CardTimeOff userId={colabProvider.user.id} />
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Gestão de Ausências"
        description="Solicite o tipo Solicitação de acordo a tua necessidade."
        size={'lg'}
      >
        <RequestForm handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal
        isOpen={isOpenModalDocument}
        onClose={handleCloseModalDocument}
        title="Solicitação de Documentos"
        description="Solicite o tipo Documento de acordo a tua necessidade."
        size={'lg'}
      >
        <RequestFormDocument
          handleCloseModal={handleCloseModalDocument}
          valueEditModal={valueEditModal}
        />
      </Modal>
    </>
  )
}
