import { IndicatorPerComponent } from './IndicatorComponent'

export interface EvaluationResume {
  id: number
  description: string
  weight: string
  id_component_indicator: number
  indicators: IndicatorPerComponent[]
  score: any
}

export interface EvaluationFinished {
  id: number
  employee_id: number
  token: string
  period: string
  global_score: string
  evaluator_employee_id: number
  approver_employee_id: number
  comments: string
  status: number
  created_at: string
  updated_at: string
  statusAVD: string
  employee: string
  evaluator: string
  approver: string
  category_id: number
  Func: string
  evaluationResume: EvaluationResume[]
}
