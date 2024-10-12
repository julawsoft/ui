export const STEPS = [
  { title: '', description: 'Seu Perfil' },
  { title: '', description: 'Informações Pessoais' },
  { title: '', description: 'Informação Bancária' },
  { title: '', description: 'Teus Documentos' },
]

export interface IDtatSetup {
  token: string
  email: string
  password: string
  name: string
  address: string
  birthdate: string
  bankName: string
  bankAccount: string
  bankIban: string
  ss: string
  append: string
}
