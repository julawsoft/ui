import {
  Container,
  ContainerGraphic,
  ContainerLabel,
  Label,
  LabelOne,
  Text,
} from './styled'

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface IPieChart {
  name: string
  value: number
}

interface IDataPie {
  data: IPieChart[]
}

const COLORS = { primary: '#C2912E', secondary: '#00B37E' }

const DoubleProgressBarCircular = ({ data }: IDataPie) => {
  return (
    <Container>
      <ContainerGraphic>
        <CircularProgressbarWithChildren
          value={data[0].value}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: COLORS.secondary,
            trailColor: 'transparent',
          })}
        >
          <div style={{ width: '84%' }}>
            <CircularProgressbar
              value={data[1].value}
              styles={buildStyles({
                trailColor: 'transparent',
                pathColor: COLORS.primary,
              })}
            />
          </div>
        </CircularProgressbarWithChildren>
      </ContainerGraphic>
      <ContainerLabel>
        <Label>
          <LabelOne style={{ backgroundColor: COLORS.secondary }} />
          <Text>{data[0].name}</Text>
        </Label>
        <Label>
          <LabelOne style={{ backgroundColor: COLORS.primary }} />
          <Text>{data[1].name}</Text>
        </Label>
      </ContainerLabel>
    </Container>
  )
}

export default DoubleProgressBarCircular
