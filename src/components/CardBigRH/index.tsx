import { Container, CarBox, Value, ContainerChildren } from './styled'

interface PropsCard {
  title: string
  children?: any
}

const CardBigRH = ({ title, children }: PropsCard) => {
  return (
    <Container>
      <CarBox>
        <Value> {title} </Value>
        <ContainerChildren>{children}</ContainerChildren>
      </CarBox>
    </Container>
  )
}

export default CardBigRH
