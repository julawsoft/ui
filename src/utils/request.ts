import { toast } from 'react-toastify'
import timeoutPromise from './request/request-time-out'
import { getLocalStorageSecret } from '../context_api/utils'
import { keyLocalStorage } from '../context_api'

interface IGenericViewResponse<T> {
  data: T
  time?: Date
  response: {
    statusCode: number
    message: string
  }
}

type HttpMethods = 'PUT' | 'POST' | 'DELETE' | 'GET'

const getToken = async (): Promise<string> => {
  const { auth } = JSON.parse(getLocalStorageSecret(keyLocalStorage))
  return auth.accessToken
}

const getRefreshToken = async (): Promise<string> => {
  const { auth } = JSON.parse(getLocalStorageSecret(keyLocalStorage))
  return auth.refreshToken
}

const TIMEOUT = 15

export class RequestApi {
  #url = import.meta.env.VITE_BASE_URI
  #token = ''

  async setRefreshToken(refreshToken: string) {
    this.#token = refreshToken
  }

  static async genericFetch<T>(
    method: HttpMethods,
    url: string,
    withRefreshToken = false,
    body?: {
      [x: string]: string
    },
    signal?: AbortSignal,
    headers?: {
      [x: string]: string
    },
  ) {

    const fetchResponse = await fetch(`${url}`, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: !withRefreshToken
          ? `${await getToken()}`
          : `${await getRefreshToken()}`,
        ...headers,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body ? JSON.stringify(body) : undefined,
      signal,
    })

    if (fetchResponse.ok) {
      try {
        const responseData: IGenericViewResponse<T> = await fetchResponse.json()
        return responseData as IGenericViewResponse<T>
      } catch (e) {
        toast.error(String(e))
        return [] as unknown as IGenericViewResponse<T>
      }
    } else {
      try {
        const response = await fetchResponse.json()
        toast.error(response.response.message)
      } catch (e) {
        toast.error(String(e))
        return [] as unknown as IGenericViewResponse<T>
      }
    }
  }

  async post<T>(
    path: string,
    data: any,
    withRefreshToken?: boolean,
    headers?: {
      [x: string]: string
    },
  ): Promise<IGenericViewResponse<T>> {
    const controller = new AbortController()
    const { signal } = controller

      const response = (await timeoutPromise(
        RequestApi.genericFetch(
          'POST',
          `${this.#url}${path}`,
          withRefreshToken,
        data,
        signal,
        headers,
        ),
      undefined,
      controller,
      )) as unknown as IGenericViewResponse<T>

      return response
  }

  async put<T>(
    path: string,
    data: any,
    withRefreshToken?: boolean,
    headers?: {
      [x: string]: string
    },
  ): Promise<IGenericViewResponse<T>> {
    const controller = new AbortController()
    const { signal } = controller

    const response = (await timeoutPromise(
      RequestApi.genericFetch(
        'PUT',
        `${this.#url}${path}`,
        withRefreshToken,
        data,
        signal,
        headers,
      ),
      undefined,
      controller,
    )) as unknown as IGenericViewResponse<T>
    return response
  }

  async get<T>(
    path: string,
    withRefreshToken?: boolean,
    headers?: {
      [x: string]: string
    },
  ): Promise<IGenericViewResponse<T>> {
    const controller = new AbortController()
    const { signal } = controller
    const response = (await timeoutPromise(
      RequestApi.genericFetch(
        'GET',
        `${this.#url}${path}`,
        withRefreshToken,
        undefined,
        signal,
        headers,
      ),
      TIMEOUT,
      controller,
    )) as unknown as IGenericViewResponse<T>

    return response
  }

  async delete<T>(
    path: string,
    withRefreshToken?: boolean,
    headers?: {
      [x: string]: string
    },
  ): Promise<IGenericViewResponse<T>> {
    const controller = new AbortController()
    const { signal } = controller
    const response = (await timeoutPromise(
      RequestApi.genericFetch(
        'DELETE',
        `${this.#url}${path}`,
        withRefreshToken,
        undefined,
        signal,
        headers,
      ),
      undefined,
      controller,
    )) as unknown as IGenericViewResponse<T>

    return response
  }
}
