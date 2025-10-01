import type { IClient } from "../schema/InterfaceClient"
import type { IColaborador, IColaboradorInput } from "../schema/InterfaceColaboradores";
import { RequestApi } from "../utils/http/request"

interface ILogin {
  username: string
  password: string
}

export class ColaboradorService {

    static async getAll(): Promise<any[]> {
        const response = await new RequestApi().get(`colaborador`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data as IColaborador[]
    }

    static async getById(id: number): Promise<any> {
        const response = await new RequestApi().get(`colaborador/${id}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data as IColaborador
    }

    static async save(data: IColaboradorInput): Promise<any> {
        const response = await new RequestApi().post(`colaborador`, { ...data });
        if(response && response.status === 400) {
            throw new Error('Erro ao salvar o cliente')
        }
        return response?.data as IColaborador
    }
    
}