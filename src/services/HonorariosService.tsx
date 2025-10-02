import type { IProcesso, IProcessoInput } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request";

export class HonorariosService {
  static async getAll(): Promise<IProcesso[]> {
    const response = await new RequestApi().get(`processo`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IProcesso[];
  }
  static async getByColaboradorId(id:number): Promise<IProcesso[]> {
    return []
    /*
    const response = await new RequestApi().get(`processo_colaborador/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IProcesso[];
    */
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
