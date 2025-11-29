// src/routes/routesPermissions.tsx
import { ReactNode } from 'react';
import { ROUTES_PATH } from './routePaths';

import Home from '../pages/Home';
import Process from '../pages/Process';
import NewProcess from '../pages/Process/newProcesso';
import ProcessMine from '../pages/Process/MyProcess';
import Employees from '../pages/Colaborador';
import Client from '../pages/Client';
import NewClient from '../pages/Client/newClient';
import NotFound from '../pages/NotFound';

import MyTimeSheets from '../pages/TimeSheets/MyTimeSheets';
import Honorarios from '../pages/Honorarios';
import MyHonorarios from '../pages/Honorarios/MyHonorarios';
import ViewClientTabs from '../pages/Client/ViewClientTabs';

import { UserRoles } from '../types/UserRoles';
import ViewColaboradorTabs from '../pages/Colaborador/ViewColaboradorTabs';
import Despesas from '../pages/Despesas';
import NewDespesas from '../pages/Despesas/newDespesas';
import NewColaborador from '../pages/Colaborador/newColaborador';
import ViewProcessoTabs from '../pages/Process/ViewProcessoTabs';
import TimeSheetsGlobal from '../pages/TimeSheets';
import MyTasks from '../pages/Tasks/MyTasks';
import TasksGlobal from '../pages/Tasks';
import NewHonorario from '../pages/Honorarios/newHonorario';
import InvoiceHonorario from '../pages/Honorarios/viewHonorarios';
import GerarCobranca from '../pages/Despesas/gerarCobranca';
import InvoiceCobranca from '../pages/Despesas/invoiceCobranca';
import ViewHonorario from '../pages/Honorarios/viewHonorarios';

interface IRoute {
  path: string;
  element: ReactNode;
  roles: UserRoles[];
  subRoute?: ReactNode;
}

export const routesPermissions: IRoute[] = [
  {
    path: ROUTES_PATH.Home,
    element: <Home />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: ROUTES_PATH.Process,
    element: <Process />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: ROUTES_PATH.ProcessMine,
    element: <ProcessMine />,
    roles: [
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: `${ROUTES_PATH.NewProcesso}`,
    element: <NewProcess />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: `${ROUTES_PATH.NewProcesso}/view/:id`,
    element: <ViewProcessoTabs />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: `${ROUTES_PATH.NewProcesso}/:id`,
    element: <NewProcess />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: ROUTES_PATH.Colaborador,
    element: <Employees />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
    ],
  },
  // Novo COLABORADOR
  {
    path: `${ROUTES_PATH.NewColaborador}`,
    element: <NewColaborador />, // Se tiver uma página específica de edição, substituir aqui
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
    ],
  },
  // Editar Colaborador
  {
    path: `${ROUTES_PATH.NewColaborador}/:id`,
    element: <NewColaborador />, // Se tiver uma página específica de edição, substituir aqui
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
    ],
  },
  // VISUALIZAR COLABORADOR
  {
    path: `${ROUTES_PATH.NewColaborador}/view/:id`,
    element: <ViewColaboradorTabs />, // Substituir por página de visualização se houver
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },

  // VISUALIZAR PROCESSO
  {
    path: `${ROUTES_PATH.Process}/:id`,
    element: <Process />, // Substituir por página de detalhes do processo se houver
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: ROUTES_PATH.Despesas,
    element: <Despesas />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: ROUTES_PATH.NewDespesas,
    element: <NewDespesas />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: `${ROUTES_PATH.NewDespesas}/:id`,
    element: <NewDespesas />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
  {
    path: `${ROUTES_PATH.GerarCobranca}`,
    element: <GerarCobranca />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
    ],
  },
  {
    path: `${ROUTES_PATH.ViewCobranca}`,
    element: <InvoiceCobranca />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
    ],
  },
  {
    path: ROUTES_PATH.Client,
    element: <Client />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
    ],
  },
  {
    path: ROUTES_PATH.NewClient,
    element: <NewClient />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  // EDITAR CLIENTE
  {
    path: `${ROUTES_PATH.NewClient}/:id`,
    element: <NewClient />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  // VISUALIZAR CLIENTE
  {
    path: `${ROUTES_PATH.NewClient}/view/:id`,
    element: <ViewClientTabs />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },

   // TASKs
   {
    path: ROUTES_PATH.Tasks,
    element: <TasksGlobal />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  {
    path: ROUTES_PATH.MyTasks,
    element: <MyTasks />,
    roles: [
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },

  // TIMESHEETS
  {
    path: ROUTES_PATH.TimeSheet,
    element: <TimeSheetsGlobal />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  {
    path: ROUTES_PATH.MyTimeSheets,
    element: <MyTimeSheets />,
    roles: [
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },

  // HONORÁRIOS
  {
    path: ROUTES_PATH.Honorario,
    element: <Honorarios />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  {
    path: ROUTES_PATH.NewHonorarios,
    element: <NewHonorario />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  {
    path: `${ROUTES_PATH.ViewHonorarios}/:id`,
    element: <ViewHonorario />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  {
    path: `${ROUTES_PATH.InvoiceHonorarios}`,
    element: <InvoiceHonorario />,
    roles: [
      UserRoles.ADMINISTRATIVO,
    ],
  },
  {
    path: ROUTES_PATH.MyHonorarios,
    element: <MyHonorarios />,
    roles: [
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },

  {
    path: ROUTES_PATH.NOTFOUND,
    element: <NotFound />,
    roles: [
      UserRoles.ADMINISTRATIVO,
      UserRoles.ADVOGADO,
      UserRoles.ESTAGIARIO,
      UserRoles.CONSULTOR,
    ],
  },
];
