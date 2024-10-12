import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import './styles.css'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { ActivityLog } from '../ActivityLog'

export default function SwipperCard({ data }) {
  const swiperRef = useRef(null)

  const handleNext = () => {
    if (swiperRef.current) {
      // swiperRef.current.swiper.slideNext()
    }
  }

  const handlePrev = () => {
    if (swiperRef.current) {
      // swiperRef.current.swiper.slidePrev()
    }
  }

  return (
    <>
      <Flex flexDirection={'column'} width={'100%'} gap={4} height={'250px'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Box>
            <Text fontSize={18}>Title</Text>
          </Box>
          <Flex gap={2} alignContent={'end'}>
            <Box
              onClick={handlePrev}
              bgColor={'#f2f2f2'}
              border={'.5px solid #BFC7D9'}
              borderRadius={4}
              p={1}
              _hover={{ cursor: 'pointer', bgColor: '#c2912e' }}
            >
              <CaretLeft size={18} />
            </Box>
            <Box
              onClick={handleNext}
              border={'.5px solid #BFC7D9'}
              borderRadius={4}
              bgColor={'#f2f2f2'}
              p={1}
              _hover={{ cursor: 'pointer', bgColor: '#c2912e' }}
            >
              <CaretRight size={18} />
            </Box>
            <Box></Box>
          </Flex>
        </Flex>
        <Flex bgColor={'red'} width={'100%'} height={'100%'}>
          <Flex
            width={'100%'}
            height={'100%'}
            position={'relative'}
            bgColor={'yellow.200'}
          >
            <Flex>
              <Swiper
                pagination={{
                  type: 'fraction',
                }}
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Autoplay,
                  EffectFade,
                ]}
                className="mySwiper"
                effect="slide"
                ref={swiperRef}
              >
                <SwiperSlide>
                  <Flex flexDirection={'column'} width={'100%'} gap={2}>
                    <ActivityLog key={1} icon={''} description={'Text'} />
                    <ActivityLog key={1} icon={''} description={'Text'} />
                  </Flex>
                </SwiperSlide>
                <SwiperSlide>
                  <Flex flexDirection={'column'} width={'100%'} gap={2}>
                    <ActivityLog key={1} icon={''} description={'Text'} />
                    <ActivityLog key={1} icon={''} description={'Text'} />
                  </Flex>
                </SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
                <Box className="swiper-pagination" />
              </Swiper>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex bgColor={'red'} width={'100%'}>
        <Box>
          {' '}
          <div className="swiper-pagination" />
        </Box>
      </Flex>
    </>
  )
}
