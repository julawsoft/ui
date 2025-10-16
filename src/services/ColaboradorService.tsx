import type { IClient } from "../schema/InterfaceClient"
import type { ICategoriaColaborador, IColaborador, IColaboradorInput, ITipoColaborador } from "../schema/InterfaceColaboradores";
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

    static async getById(id: number): Promise<IColaborador> {
        const response = await new RequestApi().get(`colaborador/${id}`);
        if(response && response.status === 400) {
            throw new Error('Erro ao obter os clientes')
        }
        return response?.data as IColaborador
    }

    static async save(data: IColaboradorInput): Promise<IColaborador> {
        const response = await new RequestApi().post(`colaborador`, { ...data });
        if(response && response.status === 400) {
            throw new Error(response.errors.toString())
        }
        return response?.data as IColaborador
    }
    static async update(data: IColaboradorInput, id: number): Promise<IColaborador> {
        try{

            const response = await new RequestApi().put(`colaborador/${id}`, { ...data });
            if(response && response.status === 400) {
                throw new Error(response.errors.toString())
            }
            return response?.data as IColaborador
        }catch(e){
            throw new Error(String(e))
        }
    }

    static async getAllTiposColaboradores(): Promise<ITipoColaborador[]> {
        const response = await new RequestApi().get(`tipos-colaboradores`);
        if(response && response.status === 400) {
            throw new Error(response.errors.toString())
        }
        return response?.data as ITipoColaborador[]
    }
    static async getAllCategoriasColaborador(): Promise<ICategoriaColaborador[]> {
        const response = await new RequestApi().get(`categorias-colaboradores`);
        if(response && response.status === 400) {
            throw new Error(response.errors.toString())
        }
        return response?.data as ICategoriaColaborador[]
    }
    
}