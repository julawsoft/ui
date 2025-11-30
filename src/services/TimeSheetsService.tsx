import type { IProcesso } from "../schema/InterfaceProcess";
import type { ITimeSheets, ITimeSheetsForm, ITipoTarefas, ITotalProjects, ITotalTasks } from "../schema/InterfaceTimeSheets";
import { RequestApi } from "../utils/http/request";

type StatusType = 'rascunho'|'submetido'|'aprovado'|'rejeitado'|'faturado'

interface filterTimeSheets {
  colaboradorId?: number | string,
  processoId?: number | string,
  clienteId?: number,
  tarefaId?: number,
  statusId?: StatusType | string,
  dataInicio?: string,
  dataFim?: string,
}

export class TimeSheetsService {

  static async getAll(filter: filterTimeSheets): Promise<ITimeSheets[]> {
    const response = await new RequestApi().get(`timesheets?${new URLSearchParams(filter as Record<string, string>).toString()}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os timesheets");
    }
    return response?.data as ITimeSheets[];
  }
  
  static async getByColaboradorId(id: number): Promise<ITimeSheets[]> {

    const response = await new RequestApi().get(`timesheets?colaboradorId=${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os timesheets do colaborador");
    }
    return response?.data as ITimeSheets[];

  }

  static async getById(id: number): Promise<IProcesso> {
    const response = await new RequestApi().get(`processo/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o processo");
    }
    return response?.data as IProcesso;
  }
  static async getTipoTarefas(): Promise<ITipoTarefas[]> {
    const response = await new RequestApi().get(`timesheets-tipos-tarefas`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o processo");
    }
    return response?.data as ITipoTarefas[];
  }

  static async save(data: ITimeSheetsForm): Promise<ITimeSheets> {
    const response = await new RequestApi().post(`processo_time_sheets`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o processo_time_sheets");
    }
    return response?.data as ITimeSheets;
  }
  static async update(idTimeSheet: number, data: ITimeSheetsForm): Promise<ITimeSheets> {
    const response = await new RequestApi().put(`processo_time_sheets/${idTimeSheet}`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o processo_time_sheets");
    }
    return response?.data as ITimeSheets;
  }

  // static async getAllTarefas(year?: number, idUser?: string): Promise<ITotalTasks[]> {
  static async getAllTarefas(): Promise<ITotalTasks[]> {
    const response = await new RequestApi().get(`timesheets-total-taferas`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o ITotalTasks");
    }
    return response?.data as ITotalTasks[];
  }

  // static async getAllProjectos(year?: number, idUser?: string): Promise<ITotalProjects[]> {
  static async getAllProjectos(): Promise<ITotalProjects[]> {
    const response = await new RequestApi().get(`timesheets-total-projectos`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o ITotalProjects");
    }
    return response?.data as ITotalProjects[];
  }

  static async getAllTarefasByUserId(idUser: number): Promise<ITotalTasks[]> {
    const response = await new RequestApi().get(`timesheets-total-taferas?idUser=${idUser}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o ITotalTasks");
    }
    return response?.data as ITotalTasks[];
  }

  static async getAllProjectosByUserId(idUser: number): Promise<ITotalProjects[]> {
    const response = await new RequestApi().get(`timesheets-total-projectos?idUser=${idUser}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o ITotalProjects");
    }
    return response?.data as ITotalProjects[];
  }

  static async submeter(idTimeSheet: number, stutus: string): Promise<ITotalProjects[]> {
    const response = await new RequestApi().patch(`timesheets-change-status?idTimeSheet=${idTimeSheet}&status=${stutus}`, {});
    if (response && response.status === 400) {
      throw new Error(response.message || "Erro ao submeter o timesheet");
    }
    return response?.data as ITotalProjects[];
  }

}
