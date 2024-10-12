import { ILatestRequestedAbsences } from '../../../../services/DashboardRH/interfaces'
import { Container, Value, Key } from './styles'

interface ItemNextAbsencesProps {
  details: ILatestRequestedAbsences
}

export function ItemNextAbsences({ details }: ItemNextAbsencesProps) {
  return (
    <Container>
      <Key> {details.Employee.name} </Key>
      <Value> {details.number_of_days} dias</Value>
    </Container>
  )
}
