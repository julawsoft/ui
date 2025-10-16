import type { IProcesso, IProcessoInput } from "../schema/InterfaceProcess";
import type { ITimeSheets, ITipoTarefas, ITotalProjects, ITotalTasks } from "../schema/InterfaceTimeSheets";
import { RequestApi } from "../utils/http/request";

export class TimeSheetsService {

  static async getAll(): Promise<ITimeSheets[]> {
    const response = await new RequestApi().get(`timesheets`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os timesheets");
    }
    return response?.data as ITimeSheets[];
  }
  static async getByColaboradorId(id:number): Promise<ITimeSheets[]> {
    
    const response = await new RequestApi().get(`/timesheets-colaborador/${id}`);
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

  static async save(data: IProcessoInput): Promise<IProcesso> {
    const response = await new RequestApi().post(`processo`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o processo");
    }
    return response?.data as IProcesso;
  }

  static async getAllTarefas(year?: number, idUser?: string): Promise<ITotalTasks[]> {
    const response = await new RequestApi().get(`timesheets-total-taferas`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o ITotalTasks");
    }
    return response?.data as ITotalTasks[];
  }

  static async getAllProjectos(year?: number, idUser?: string): Promise<ITotalProjects[]> {
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


  
}
