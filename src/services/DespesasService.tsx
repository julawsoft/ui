import type { IColaborador, IColaboradorInput } from "../schema/InterfaceColaboradores";
import type { IDespesas, IDespesasInput, ITipoDespesas } from "../schema/interfaceDespesas";
import { RequestApi } from "../utils/http/request"


export class DespesasService {

    static async getAll(): Promise<IDespesas[]> {
        const response = await new RequestApi().get(`despesas`);
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

    static async getById(id: number): Promise<any> {
        const response = await new RequestApi().get(`colaborador/${id}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data as IColaborador
    }

   

    static async save(data: IDespesasInput): Promise<IDespesas> {
        const response = await new RequestApi().post(`despesas`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o despesas')
        }
        return response?.data as IDespesas
    }
    
}