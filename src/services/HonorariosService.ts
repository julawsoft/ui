import type { HonorarioInput, IFatura, IHonorarioInvoice, IHonorarios } from "../schema/InterfaceHonorarios";
import type { IProcesso } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request";

type StatusType = 'pendente'|'pago'

interface filterTimeSheets {
  colaboradorId?: number,
  processoId?: number,
  clienteId?: number,
  tipoDespesaId?: number,
  statusId?: StatusType,
  dataInicio?: string,
  dataFim?: string,
}


export class HonorariosService {

  static async getAll(filter: filterTimeSheets): Promise<IHonorarios[]> {
    const response = await new RequestApi().get(`honorarios?${new URLSearchParams(filter as Record<string, string>).toString()}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IHonorarios[];
  }

  static async getParcelas(processoId: number): Promise<IHonorarios[]> {
    const response = await new RequestApi().get(`honorarios?processoId=${processoId}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os honorarios parcelas");
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

  static async save(data: HonorarioInput): Promise<IHonorarios> {
    const response = await new RequestApi().post(`honorarios`, { ...data });
    if (response && response.status === 400) {
      throw new Error("Erro ao salvar o IHonorarios");
    }
    return response?.data as IHonorarios;
  }

  static async getByProcessoId(id:number): Promise<IHonorarios[]> {
    const response = await new RequestApi().get(`/processo-factura?idProcesso=${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IHonorarios[];
    
  }

  static async getFacturaById(id:number): Promise<IFatura> {
    const response = await new RequestApi().get(`/processo-factura/${id}`);
    if (response && response.status === 400) {
      throw new Error("Erro ao obter os processos");
    }
    return response?.data as IFatura;
    
  }

  static async getHonorarioInvoice(idHonorario: number): Promise<IHonorarioInvoice> {
    const response = await new RequestApi().get(`honorario_invoice/${idHonorario}`)
    if(response && response.status === 400) {
      throw new Error(response.message ?? "Erro ao buscar os dados da fatura")
    }
    return response?.data as IHonorarioInvoice
  }

  static async approveHonorarioInvoice(idHonorario: number, userId: number): Promise<IHonorarioInvoice> {
    const response = await new RequestApi().put(`/honorario_invoice/${idHonorario}`, {userId})
    if(response && (response.status === 400 ||  response.status === 500)) {
      throw new Error(response.message ?? "Erro ao buscar os dados da fatura")
    }
    return response?.data as IHonorarioInvoice
  }

  static async getEstados(): Promise<any[]> {
    return [
      {
        id: 'pendente',
        value: 'Pendente'
      },
      {
        id: 'pago',
        value: 'Pago'
      }
    ]
  }

}
