import type Colaborador from "../pages/Colaborador";

export const ROUTES_PATH = {
  Home: '/',
  Login: '/login',
  NOTFOUND: '/notfound',

  // PROCESSOS
  Process: '/processos',
  ProcessMine: '/meus-processos',
  NewProcesso: '/processo',
  ViewProcess: '/processo/view/:id', // visualizar processo

  // CLIENTES
  Client: '/clientes',
  NewClient: '/cliente',
  EditClient: "/clients/:id",         // editar cliente
  ViewClient: "/clients/view/:id",    // visualizar cliente

  // COLABORADORES
  Colaborador: '/colaboradores',
  NewColaborador: '/colaborador',
  EditColaborador: "/colaborador/:id",         // editar colaborador
  ViewColaborador: "/colaborador/view/:id",    // visualizar colaborador

  // DESPESAS
  Account: '/despesas',

  // TIMESHEETS
  TimeSheet: '/timesheets',
  MyTimeSheets: '/meus-timesheets',

  // HONORÁRIOS
  Honorario: '/honorarios',
  MyHonorarios: '/meus-honorarios',
};
