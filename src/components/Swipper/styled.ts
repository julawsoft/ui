import styled from 'styled-components'

export const SwiperSlide = styled.div``

export const SwipperContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  position: absolute;
  left: 60px;
  top: 25%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    border-radius: 6px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #c2912e !important;
  }

  .swipper-container {
    width: 50%;
    text-align: left;
    position: absolute;
    left: 60px;
    top: 25%;
  }
`

export const SwipperText = styled.div`
  font-size: var(--h2-font-size);
  font-weight: 600;
  color: #fff;
  font-family: avenirBold;
`

export const SwipperTextSmall = styled.div`
  color: #fff;
  font-family: avenirLight;
`

export const SwipperButton = styled.div`
  margin-top: 3rem;
`

export const Container = styled.div`
  padding: 1rem;
`
