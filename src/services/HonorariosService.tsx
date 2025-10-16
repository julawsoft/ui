import type { IHonorarios } from "../schema/InterfaceHonorarios";
import type { IProcesso, IProcessoInput } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request";

export class HonorariosService {

  static async getAll(): Promise<IHonorarios[]> {
    const response = await new RequestApi().get(`honorarios`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IHonorarios[];
  }
  static async getHorariosByColaboradorId(idColaborador: number): Promise<IHonorarios[]> {
    const response = await new RequestApi().get(`honorarios?idColaborador=${idColaborador}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IHonorarios[];
  }
  static async getByColaboradorId(id:number): Promise<IHonorarios[]> {
    
    const response = await new RequestApi().get(`/processo-factura-colaborador/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IHonorarios[];
    
  }

  static async getById(id: number): Promise<IProcesso> {
    const response = await new RequestApi().get(`processo/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter o processo");
    }
    return response?.data as IProcesso;
  }

  static async save(data: IProcessoInput): Promise<IProcesso> {
    const response = await new RequestApi().post(`processo`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o processo");
    }
    return response?.data as IProcesso;
  }
}
