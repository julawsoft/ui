import { RequestApi } from "../utils/http/request"

interface ILogin { 
    username: string
    password: string
}

export class LoginService {
    static async login(data: ILogin): Promise<any> {
        return await new RequestApi().post(`login`, { ...data })
    }
    static async logout(): Promise<any> {
        return await new RequestApi().post(`logout`, { data :' ' })
    }
}
