import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import './styles.css'

import { useNavigate } from 'react-router-dom'
import { INotesList } from '../../schema/Notes'
import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { ROUTES } from '../../routes/constants'

export default function Swipper({ data }) {
  const pathStaticFiles = import.meta.env.VITE_URL_STATIC_FILES + '/'
  const navigate = useNavigate()

  const handleDetails = (id: number) => {
    navigate(ROUTES.InformativeNotesPreview, {
      state: { id, back: ROUTES.Home },
    })
  }

  function printHTML(param: string) {
    return { __html: param }
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {data && data.length > 0 ? (
        data.map((item: INotesList, key: number) => {
          return (
            <SwiperSlide key={key}>
              <Flex
                h={'100%'}
                bgColor={'#f2f2f2'}
                width={'100%'}
                flexDirection={'column'}
                backgroundImage={`${pathStaticFiles + '/' + item.image}`}
                backgroundPosition={'center'}
                backgroundSize={'cover'}
                backgroundRepeat="no-repeat"
              >
                <Box bgColor={'rgba(0, 0, 0, 0.7)'} p={5} w={'100%'} h={'100%'}>
                  <Flex
                    flexDirection={'column'}
                    h={'80%'}
                    pt={10}
                    pl={isMobile ? 5 : 20}
                    pr={isMobile ? 10 : 20}
                    width={'100%'}
                    justifyContent={'flex-start'}
                    gap={1}
                    overflow={'auto'}
                  >
                    <Box textAlign={'left'}>
                      <Text
                        fontSize={isMobile ? '1.5rem' : '2rem'}
                        fontWeight={'bold'}
                        fontFamily={'body'}
                        color={'#C2912E'}
                        textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)"
                      >
                        {item.title}
                      </Text>
                    </Box>
                    <Box
                      fontSize={'md'}
                      textAlign={'left'}
                      textColor={'white'}
                      dangerouslySetInnerHTML={printHTML(item.description)}
                    ></Box>
                  </Flex>
                  <Flex h={'20%'}>
                    <Box ml={isMobile ? 25 : 75}>
                      <Button
                        color="#C2912E"
                        border={'1px solid #C2912E'}
                        onClick={() => handleDetails(item.id)}
                        colorScheme="transparent"
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        textShadow="1px 1px 2px rgba(0, 0, 0, 0.1)"
                      >
                        Ver mais
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </SwiperSlide>
          )
        })
      ) : (
        <SwiperSlide>Nenhuma nota encontrada!</SwiperSlide>
      )}
    </Swiper>
  )
}
