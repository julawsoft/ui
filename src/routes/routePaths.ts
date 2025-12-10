export const ROUTES_PATH = {
  Home: '/',
  Login: '/login',
  NOTFOUND: '/notfound',

  // PROCESSOS
  Process: '/processos',
  ProcessMine: '/meus-processos',
  NewProcesso: '/processo',
  ViewProcess: '/processo/view',

  // CLIENTES
  Client: '/clientes',
  NewClient: '/cliente',
  EditClient: "/clients/:id",     
  ViewClient: "/clients/view/:id",    

  // COLABORADORES
  Colaborador: '/colaboradores',
  NewColaborador: '/colaborador',
  EditColaborador: "/colaborador/:id",
  ViewColaborador: "/colaborador/view",    

  // DESPESAS
  Despesas: '/despesas',
  NewDespesas: '/despesa',
  EditDespesas: "/despesa/:id", 
  GerarCobranca: "/despesa/cobranca", 
  ViewCobranca: "/invoice-cobranca/", 

  // TIMESHEETS
  TimeSheet: '/timesheets',
  MyTimeSheets: '/meus-timesheets',

  // HONORÁRIOS
  Honorario: '/honorarios',
  MyHonorarios: '/meus-honorarios',
  NewHonorarios: '/honorario',
  InvoiceHonorarios: '/invoice-honorarios/:',
  EditHonorarios: '/honorario/:id',
  ViewHonorarios: '/honorario/view',

  // TASKS
  Tasks: '/tarefas',
  MyTasks: '/minhas-tarefas',
  NewTask: '/honorario',
  EditTask: '/honorario/:id',
  ViewTask: '/honorario/view/:id',
};
