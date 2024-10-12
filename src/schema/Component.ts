import { IndicatorPerComponent } from './IndicatorComponent'

export interface Component {
  id: number
  description: string
  indicators: IndicatorPerComponent[]
  weight: string
  score: any
}
