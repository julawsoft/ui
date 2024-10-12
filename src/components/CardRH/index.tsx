import { Container, CarBox, Value, Description } from './styled'

interface PropsCard {
  value: number
  description: string
  isBlack?: boolean
}

const CardRH = ({ value, description, isBlack }: PropsCard) => {
  return (
    <Container style={{ backgroundColor: isBlack ? '#24272a' : '#fff' }}>
      <CarBox>
        <Value> {value} </Value>
        <Description> {description} </Description>
      </CarBox>
    </Container>
  )
}

export default CardRH
