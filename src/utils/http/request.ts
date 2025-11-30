import { getUserLogged } from "../cookies";

const timeoutPromise = <T>(
    promise: Promise<T>,
    timeout: number,
    controller: AbortController,
): Promise<T> => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            controller.abort();
            reject(new Error(`Request timed out after ${timeout} seconds`));
        }, timeout * 1000);

        promise
            .then((response) => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch((error) => {
                clearTimeout(timer);
                reject(error);
            });
    });
};

interface IGenericViewResponse<T> {
    data: T;
    time?: Date;
    message: string;
    status: number;
    errors: string[];

}

type HttpMethods = 'PUT' | 'POST' | 'DELETE' | 'GET' | 'PATCH';

const getToken = async (): Promise<string> => {
    const { accessToken } = getUserLogged()
    return accessToken;
};

const getRefreshToken = async (): Promise<string> => {
    const { refreshToken } = getUserLogged()
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

        const responseData: IGenericViewResponse<T> = await response.json();
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

    async patch<T>(
        path: string,
        data: Record<string, unknown>,
        withRefreshToken = false,
        headers?: Record<string, string>,
    ): Promise<IGenericViewResponse<T> | null> {
        return RequestApi.fetchWithTimeout<T>('PATCH', path, data, withRefreshToken, headers);
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
