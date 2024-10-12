import { Container, Value, Key } from './styled'

interface PropsCard {
  keys: string
  value?: any
}

const ItemCardRH = ({ keys, value }: PropsCard) => {
  return (
    <Container>
      <Key> {keys} </Key>
      <Value> {value}</Value>
    </Container>
  )
}

export default ItemCardRH
