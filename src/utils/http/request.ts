import { getUserLogged } from "../cookies";
import { logOutAppSec } from "./helpers";

const timeoutPromise = <T>(
    promise: Promise<T>,
    timeout: number,
    controller: AbortController,
): Promise<T> => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            controller.abort(); // Abortar a requisição após o tempo limite
            reject(new Error(`Request timed out after ${timeout} seconds`));
        }, timeout * 1000); // Converter segundos para milissegundos

        promise
            .then((response) => {
                clearTimeout(timer); // Limpar o timer se a requisição completar antes do timeout
                resolve(response);
            })
            .catch((error) => {
                clearTimeout(timer); // Limpar o timer se ocorrer algum erro
                reject(error);
            });
    });
};



interface IGenericViewResponse<T> {
    data: T;
    time?: Date;
    response: {
        statusCode: number;
        message: string;
    };
}

type HttpMethods = 'PUT' | 'POST' | 'DELETE' | 'GET';

const getToken = async (): Promise<string> => {
    const {accessToken} = getUserLogged()
    return accessToken;
};

const getRefreshToken = async (): Promise<string> => {
    const {refreshToken} = getUserLogged()
    return refreshToken;
};

const TIMEOUT = 15;

export class RequestApi {

    static async genericFetch<T>(
        method: HttpMethods,
        url: string,
        withRefreshToken = false,
        body?: Record<string, unknown>,
        signal?: AbortSignal,
        headers?: Record<string, string>,
    ): Promise<IGenericViewResponse<T> | null> {
    
            const token = !withRefreshToken ? await getToken() : await getRefreshToken();

            const response = await fetch(url, {
                method,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                    ...headers,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: body ? JSON.stringify(body) : undefined,
                signal,
            });

            console.log(" repsonse do request.ts >>> ", response)

            const responseData: IGenericViewResponse<T> = await response.json();

            if (!response.ok) {
                if(responseData.response.message.toString().includes("Token expirado")){
                    console.log("Token expirado")
                    await logOutAppSec(responseData.response.message)
                    console.log("Token expirado depois ... ")
                    return null
                }
                throw new Error(responseData.response.message)
            }
        return responseData;
    }

    static async fetchWithTimeout<T>(
        method: HttpMethods,
        path: string,
        data?: Record<string, unknown>,
        withRefreshToken = false,
        headers?: Record<string, string>,
        timeout = TIMEOUT,
    ): Promise<IGenericViewResponse<T> | null> {
        const controller = new AbortController();
        const { signal } = controller;

        let url = import.meta.env.VITE_BASE_URI

        return timeoutPromise(
            RequestApi.genericFetch<T>(
                method,
                `${url}${path}`,
                withRefreshToken,
                data,
                signal,
                headers,
            ),
            timeout,
            controller,
        );
    }

    async post<T>(
        path: string,
        data: Record<string, unknown>,
        withRefreshToken = false,
        headers?: Record<string, string>,
    ): Promise<IGenericViewResponse<T> | null> {
        return RequestApi.fetchWithTimeout<T>('POST', path, data, withRefreshToken, headers);
    }

    async put<T>(
        path: string,
        data: Record<string, unknown>,
        withRefreshToken = false,
        headers?: Record<string, string>,
    ): Promise<IGenericViewResponse<T> | null> {
        return RequestApi.fetchWithTimeout<T>('PUT', path, data, withRefreshToken, headers);
    }

    async get<T>(
        path: string,
        withRefreshToken = false,
        headers?: Record<string, string>,
    ): Promise<IGenericViewResponse<T> | null> {
        return RequestApi.fetchWithTimeout<T>('GET', path, undefined, withRefreshToken, headers);
    }

    async delete<T>(
        path: string,
        withRefreshToken = false,
        headers?: Record<string, string>,
    ): Promise<IGenericViewResponse<T> | null> {
        return RequestApi.fetchWithTimeout<T>('DELETE', path, undefined, withRefreshToken, headers);
    }
}
