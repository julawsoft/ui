export interface ITags {
  title: string
  description: string
  employee_id: number
  depto_id: number
  tag_id: number
  link?: string
}

export interface ITagsList {
  title: string
  description: string
  image?: string
  depto?: string
  tag?: string
  link?: string
  createdAt?: string
}
