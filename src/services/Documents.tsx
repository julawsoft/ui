import { RequestApi } from "../utils/http/request"

export interface IDocuments {
    id: number,      
    description: string,
    user_email: string, 
    attach: string  
    created_at: string  
}

export class DocumentsService {

    constructor(){}

    static async getList() {
        return await new RequestApi().get<IDocuments[]>(`/documents`)
    }

}