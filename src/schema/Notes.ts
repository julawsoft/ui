import { IEmployee } from './Employee'

export interface INotesInformativeToSave {
  title: String;
  description: String;
  employee_id: number;
  tag_id: number;
  status: boolean;
  image?: String;
  visibility: boolean;
}

export interface INotes {
  title: string
  description: string
  employee_id: number
  depto_id: number
  tag_id: number
  link?: string
}

export interface INotesListII {
  title: string
  description: string
  image?: string
  employee?: IEmployee
  depto_id?: number
  depto?: string
  tag?: string
  link?: string
  created_at: string
  id: number
  NotesTag: { id: number; tag: string }
  status?: boolean
  tag_id?: number
  employee_id?: number
}

export interface INotesList {
  id: number
  title: string
  description: string
  employee_id: number
  image: string
  link: string
  status: boolean
  created_at: string
  updated_at: string
  Tag: {
    description: string;
  }
  Employee: {
    name: string
    Contract: [
      {
        Role: {
          description: string
        }
      },
    ]
  }
}
