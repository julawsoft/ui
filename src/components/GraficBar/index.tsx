import { Text } from '@chakra-ui/react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { Container, Header, Body, Footer } from './styled'

export interface IDataGraphicChart {
  name: string
  component1: number
  component2: number
}

interface GraficBarProps {
  title: string
  data: any[]
  label1: string
  label2: string
  color1: string
  color2: string
}

export function GraficBar({
  title,
  data,
  label1,
  label2,
  color1,
  color2,
}: GraficBarProps) {
  return (
    <Container>
      <Header>
        <Text as="h3" fontSize="md" fontWeight="medium">
          {title}
        </Text>
      </Header>
      <Body>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ strokeWidth: 1 }} filterNull={true} />
            <Legend verticalAlign="bottom" height={36} />

            <Bar dataKey={label1} fill={color1} />
            <Bar dataKey={label2} fill={color2} />
          </BarChart>
        </ResponsiveContainer>
      </Body>
      <Footer></Footer>
    </Container>
  )
}
