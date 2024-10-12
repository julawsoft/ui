import styled from 'styled-components'

export const Container = styled.div``

export const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 100px);
  gap: 10px;
  color: #5a5a66;
`
export const GridCardHome = styled.div`
  display: grid;
  grid-template-rows: 160px 1fr;
  width: 100%;
  gap: 30px;
`

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`

export const ContainerBigCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 5px;
`

export const GrificCardDiv = styled.div`
  background: #fff;
  color: #c2912e;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LeftCardDivider = styled.div`
  border-left: 0.7px solid #707070;
`
export const EmptyBigCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
`
