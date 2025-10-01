import type { IClient } from "../schema/InterfaceClient"
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

    static async getById(id: number): Promise<any> {
        return await new RequestApi().post(`logout`, { data :' ' })
    }

    static async save(data: any): Promise<any> {
        const response = await new RequestApi().post(`cliente`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o cliente')
        }
        return response?.data as IClient
    }
    
}