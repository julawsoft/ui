import { RequestApi } from "../utils/http/request"

export interface IDocuments {
    description: string,
    user_email: string, 
    attach: string  
    created_at?: string  
    id?: number,      
}

export class DocumentsService {

    constructor(){}

    static async getList() {
        return await new RequestApi().get<IDocuments[]>(`/documents`)
    }

    static async save(data: IDocuments): Promise<any> {
        return await new RequestApi().post(`document`, { data })
    }

}