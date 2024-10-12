import { Container, Header, Center, Body, Footer } from './styled'

import GaugeChart from 'react-gauge-chart'

interface GraficGaugeProps {
  title: string
  value: number
  totalValue: number
  id?: string
  nrOfLevels?: number
  colors?: string[]
  arcWidth?: number
  needleColor?: string
  textColor?: string
}

export function GraficGauge({
  title,
  value = 10,
  totalValue = 100,
  id = 'gauge-chart1',
  nrOfLevels = 30,
  colors = ['#FFC371', '#c2912e'],
  arcWidth = 0.3,
  needleColor = '#FFC371',
  textColor = '#000',
}: GraficGaugeProps) {

  return (
    <Container>
      <Header>
        <Center>
          {title}: <span>{value}</span>
        </Center>
      </Header>
      <Body>
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={nrOfLevels}
          colors={colors}
          arcWidth={arcWidth}
          percent={value / totalValue}
          needleColor={needleColor}
          textColor={textColor}
        />
      </Body>
      <Footer></Footer>
    </Container>
  )
}
