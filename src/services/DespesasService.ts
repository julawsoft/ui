import type { IDespesas, IDespesasInput, ITipoDespesas } from "../schema/interfaceDespesas";
import { RequestApi } from "../utils/http/request"

type StatusType = 'pendente'|'faturado'

interface filterTimeSheets {
    colaboradorId?: number,
    processoId?: number,
    clienteId?: number,
    tipoDespesaId?: number,
    statusId?: StatusType | string,
    dataInicio?: string,
    dataFim?: string,
}

export class DespesasService {

    static async getAll(filter:filterTimeSheets): Promise<IDespesas[]> {
        const response = await new RequestApi().get(`despesas?${new URLSearchParams(filter as Record<string, string>).toString()}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter as despesas')
        }
        return response?.data as IDespesas[]
    }
    static async getAllTiposDespesas(): Promise<ITipoDespesas[]> {
        const response = await new RequestApi().get(`tipos-despesas`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os tipos de despesas')
        }
        return response?.data as ITipoDespesas[]
    }

    static async getById(id: number): Promise<IDespesas> {
        const response = await new RequestApi().get<IDespesas[]>(`despesas/${id}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os despesas')
        }
        return response?.data[0] as IDespesas
    }

    static async save(data: IDespesasInput): Promise<IDespesas> {
        const response = await new RequestApi().post(`despesas`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o despesas')
        }
        return response?.data as IDespesas
    }

    static async update(id:number, data: IDespesasInput): Promise<IDespesas> {
        const response = await new RequestApi().put(`despesas/${id}`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o despesas')
        }
        return response?.data as IDespesas
    }
    
}
