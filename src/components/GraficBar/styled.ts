import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 20px 1fr 1px;
  gap: 5px;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Left = styled.div`
  font-size: 18px;
  font-weight: 550;

  span {
    font-size: 12px;
    font-weight: 500px;
  }
`

export const Right = styled.div``

export const Body = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    .recharts-surface {
      background-color: red;
      width: 750px;
    }
  }
`

export const Footer = styled.div``
