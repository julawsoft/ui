import type { IClient } from "../schema/InterfaceClient"
import type { IProcesso } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request"

export class ClientService {

    static async getAll(tipoCliente = 'undefined'): Promise<any[]> {
        const response = await new RequestApi().get(`cliente?tipoClienteId=${tipoCliente}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data as IClient[]
    }
    static async getProcessos(idClient: number): Promise<IProcesso[]> {
        const response = await new RequestApi().get(`cliente_processos/${idClient}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data as IProcesso[]
    }

    static async getById(id: number): Promise<IClient> {
        const response = await new RequestApi().get<IClient[]>(`cliente/${id}`)
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data[0] as any
    }

    static async save(data: any): Promise<IClient> {
        const response = await new RequestApi().post(`cliente`, { ...data });
        if(response && response.status === 400) {
            throw new Error(response.errors.length ? response.errors.toString() : response.message)
        }
        return response?.data as IClient
    }
    
    static async update(id:number, data: any): Promise<IClient> {
        const response = await new RequestApi().put(`cliente/${id}`, { ...data });
        if(response && response.status === 400) {
            throw new Error(response.message ?? 'Erro ao actualizar dados do Cliente')
        }
        return response?.data as IClient
    }
}
