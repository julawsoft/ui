import { toast } from "react-toastify";
import { LoginService } from "../../services/Login";
import { setUserLogged } from "../cookies";

export function makeResponseHTTPRequest(error: string) {
    switch (error) {
        case '401':
            return { status: 401, message: 'Unauthorized' };
        case '403':
            return { status: 403, message: 'Forbidden' };
        case '404':
            return { status: 404, message: 'Not Found' };
        case '500':
            return { status: 500, message: 'Internal Server Error' };
        default:
            return { status: 500, message: 'Internal Server Error' };
    }
}

export async function logOutAppSec(message: string | undefined) {
    try {
        const response = await LoginService.logout()

        if (response && response.response.statusCode === 200) {
            setUserLogged({
                id: 0,
                name: '',
                groups: '',
                roles: [''],
                accessToken: '',
                refreshToken: '',
                isLogged: false
            })

            if(message) 
            {
                toast.error(message)
            }

            setTimeout(() => {
                location.href = '/login'
            }, 1000)


        } else {

            console.log("Please")
            toast.error(response.response.message)
        }

    } catch (err: any) {
        console.log("sadhsadosadhsadoisadohsadhsahdosahdosodhosai ")
        toast.error(err.message)
    }
}