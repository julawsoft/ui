import type { ITasks, ITasksInput } from "../schema/InterfaceTarefa";
import { RequestApi } from "../utils/http/request";

interface filterTasks {
  colaboradorId?: string,
  processoId?: string, 
  clienteId?: string
  dataInicio?:string, 
  dataFim?: string
  statusId?: string
  tipoTarefa?: string
}

export class TasksService {

  static async getTasksByProcesso(
    processoId: number,
  ): Promise<ITasks[]> {
    const response = await new RequestApi().get(`tasks?processoId=${processoId}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter as tarefas");
    }
    return response?.data as ITasks[];
  }


  static async getAll(
   filter?:filterTasks
  ): Promise<ITasks[]> {
    const response = await new RequestApi().get(`tasks?${new URLSearchParams(filter as Record<string, string>).toString()}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter as tarefas");
    }
    return response?.data as ITasks[];
  }

  static async getTasksByColaboradorId(
    colaboradorId: number,
    dataInicio: string,
    dataFim: string
  ) {
    const response = await new RequestApi().get(`tasks?colaboradorId=${colaboradorId}&dataInicio=${dataInicio}&dataFim=${dataFim}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter as tarefas");
    }
    return response?.data as ITasks[];
  }
  static async saveTask(
   data: ITasksInput
  ) {
    const response = await new RequestApi().post<ITasksInput>(`tasks`, { ...data });
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as ITasksInput

  }
  static async updateTask(
    id:number,
   data: ITasksInput
  ) {
    const response = await new RequestApi().put<ITasksInput>(`tasks/${id}`, { ...data });
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as ITasksInput

  }
  static async deleteTask(
    id:number,
  ) {
    const response = await new RequestApi().delete<ITasksInput>(`tasks/${id}`);
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as ITasksInput

  }

  static async changeStatusTask(
    id:number,
    status: string,
    dataRealizada?: string,
    dataAprovada?: string
  ) {
    const response = await new RequestApi().patch<ITasksInput>(`tasks/${id}`, { status, dataAprovada, dataRealizada });
    if (response && response.status === 400)
        throw new Error(String(response.errors ? response.errors.toString(): response.message))
     
    return response?.data as ITasksInput

  }

}
