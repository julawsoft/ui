export interface IEvaluationProps {
  id: number
  employee_id: number
  token: string
  period: string
  global_score: string
  evaluator_employee_id: number | null
  approver_employee_id: number | null
  comments: string
  status: number
  created_at: string
  updated_at: string
  employee: string
  evaluator: string
  approver: string
  Func: string
  statusAVD: string
  global_description: string
  aprove_photo: string
  evaluator_photo: string
  employee_photo: string
  manager?: string
  status_auto_evaluation?: number
  status_review?: number
  review_description?: string
  review_score?: number
  auto_evaluation_description?: string
  auto_evaluation_score?: number
}
