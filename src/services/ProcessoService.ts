import type { IAddAssociadosProcesso, IAddEquipasTarefas, IProcesso, IProcessoAddAnexo, IProcessoInput, IProcessoInstituicoes, IProcessoModoFacturacao, IProcessoStatus } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request";
import { handleApiErrorResponse } from "../utils/responseUtils";

  interface filterProcessos {
    clientId?: number, 
    instituicaoId?: string, 
    fase?: string, 
    estadoId?: string, 
    gestorId?: string, 
    colaboradorId?: string, 
    mFacturacaoId?: string,
    dataInicio?:string, 
    dataFim?: string
  }

export class ProcessoService {
  static async getAll(filter?: filterProcessos): Promise<IProcesso[]> {
    const response = await new RequestApi().get(`processo?${new URLSearchParams(filter as Record<string, string>).toString()}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IProcesso[];
  }
  static async getByColaboradorId(id: number): Promise<IProcesso[]> {
    const response = await new RequestApi().get(`processo_colaborador/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IProcesso[];
  }

  static async getById(id: number): Promise<IProcesso> {
    const response = await new RequestApi().get<IProcesso[]>(`processo/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o processo");
    }
    return response?.data[0] as IProcesso;
  }

  static async listInstituicoes(): Promise<IProcessoInstituicoes[]> {
    const response = await new RequestApi().get(`processo-instituicoes`);
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o processo");
    }
    return response?.data as IProcessoInstituicoes[];
  }

  static async listModoFacturacao(): Promise<IProcessoModoFacturacao[]> {
    const response = await new RequestApi().get(`processo-modo-facturacao`);
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o processo");
    }

    return response?.data as IProcessoModoFacturacao[];
  }

  static async listStatus(): Promise<IProcessoStatus[]> {
    const response = await new RequestApi().get(`processo-status`);
    if (response && response.status === 400) {
      throw new Error("Erro ao status");
    }
    return response?.data as IProcessoStatus[];
  }

  static async update(data: IProcessoInput, id: number): Promise<IProcesso>{
    const response = await new RequestApi().put<IProcesso>(`processo/${id}`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao alterar os dados do processo");
    }
    return response?.data as IProcesso
  }

  static async updateMetodologias(metodologia: string, estrategia: string,    factos: string, objectivo:string, dadosImportantes:string, id: number): Promise<IProcesso>{
    const data = {
      metodologia,
      estrategia,
      factos,
      objectivo,
      dadosImportantes
    }
    const response = await new RequestApi().put<IProcesso>(`processo-metodologias/${id}`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao alterar os dados do processo");
    }
    return response?.data as IProcesso
  }

  static async save(data: IProcessoInput): Promise<IProcesso>{
    const response = await new RequestApi().post<IProcesso>(`processo`, { ...data });
    if (response && response.status === 400) 
        throw new Error(response.errors ? String(handleApiErrorResponse(response.errors)): response.message ?? "Erro ao salvar o processo");
    return response?.data as IProcesso
  }

  static async removerRecursosProcessos(type: string, id: number): Promise<IProcesso>{
    const response = await new RequestApi().delete<IProcesso>(`recursos_processo?type=${type}&id=${id}`);
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{
        
      }
    }
    return response as any
  }
  
  static async addEquipasTarefas(data: IAddEquipasTarefas): Promise<IProcesso>{
    const response = await new RequestApi().post<IProcesso>(`recursos_processo`, { ...data });
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as IProcesso
  }

  static async addAssociadosProcesso(data: IAddAssociadosProcesso): Promise<IProcesso>{
    const response = await new RequestApi().post<IProcesso>(`recursos_processo`, { ...data });
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as IProcesso
  }

  static async addAnexosProcesso(data: IProcessoAddAnexo): Promise<IProcesso>{
    const response = await new RequestApi().post<IProcesso>(`anexos_processo`, { ...data });
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as IProcesso
  }

  static async getAllColaboradoresWithoutAssociadoProcesso(): Promise<IProcesso[]>{
    const response = await new RequestApi().get(`processo`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IProcesso[];
  }

  static async updateEstadoTarefa(idTarefa: number, estado: string) {
    console.log("", idTarefa, estado)
  }
}
