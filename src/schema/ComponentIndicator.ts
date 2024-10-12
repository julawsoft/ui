export interface IndicatorProps {
  id: number
  Indicator: {
    reference: string
    description: string
  }
  id_component: number
  id_indicator: number
  updated_at: string
  created_at: string
}

export interface ComponentIndicator {
  id: number
  component_above: number
  create_at: string
  description: string
  id_level: number
  indicators: IndicatorProps[]
  update_at: string
}
