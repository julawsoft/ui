import type { IClient } from "../schema/InterfaceClient"
import type { IProcesso } from "../schema/InterfaceProcess";
import { RequestApi } from "../utils/http/request"

interface ILogin {
  username: string
  password: string
}

export class ClientService {

    static async getAll(): Promise<any[]> {
        const response = await new RequestApi().get(`cliente`);
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

    static async save(data: any): Promise<any> {
        const response = await new RequestApi().post(`cliente`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o cliente')
        }
        return response?.data as IClient
    }
    static async update(id:number, data: any): Promise<any> {
        const response = await new RequestApi().post(`cliente`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o cliente')
        }
        return response?.data as IClient
    }
    
}