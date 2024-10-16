import { RequestApi } from "../utils/http/request"

interface ILogin {
  email: string
  password: string
}

export class LoginService {

    constructor(){}

    static async login(data: ILogin): Promise<any> {
        return await new RequestApi().post(`login`, { data })
    }
    
}