import type { IProcesso, IProcessoInput, IProcessoInstituicoes, IProcessoModoFacturacao, IProcessoStatus } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request";

export class ProcessoService {
  static async getAll(): Promise<IProcesso[]> {
    const response = await new RequestApi().get(`processo`);
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
    const response = await new RequestApi().get(`processo/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o processo");
    }
    return response?.data as IProcesso;
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

  static async save(data: IProcessoInput): Promise<IProcesso>{
    const response = await new RequestApi().post<IProcesso>(`processo`, { ...data });
    if (response && response.status === 400) {
      if(response.errors){
        throw new Error(String(response.errors.toString()))
      }else{

      }
    }
    return response?.data as IProcesso
  }
}
