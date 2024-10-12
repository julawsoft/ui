import { Container, CarBox, Value, Description } from './styled'

interface PropsCard {
  title?: string
  icon?: string
  value?: number
  description?: string
}

const Card = ({ title, icon, value, description }: PropsCard) => {
  return (
    <Container className="col-lg-3 col-sm-6">
      <CarBox>
        <Value> {value} </Value>
        <Description> {description} </Description>
      </CarBox>
    </Container>
  )
}

export default Card
