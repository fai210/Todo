import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { StatusCodes } from './enums'


function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
        (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
    )
}

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
    'X-Correlation-Id': uuidv4(),
}

const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      
        if (globalThis) {
            const token = globalThis.localStorage?.getItem('accessToken')
            if (token != null) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        return config
    } catch (error) {
        throw (error as Error).message
    }
}

class Http {
    baseURL: string
    private instance: AxiosInstance | null = null

    private get http(): AxiosInstance {
        return this.instance ?? this.initHttp();
    }
    constructor(baseUrl: string) {
        this.baseURL = baseUrl
    }
    initHttp() {
        const http = axios.create({
            baseURL: this.baseURL,
            headers,
            // withCredentials: true,
        })

        http.interceptors.request.use(
            injectToken,
            error => {
                if (!(error instanceof Error)) {
                    return Promise.reject(new Error(String(error)));
                }
                return Promise.reject(error);
            }
        );
        
        http.interceptors.response.use(
            response => response,
            error => {
                const { response } = error
                return this.handleError(response)
            },
        )

        this.instance = http

        return http
    }

    request<T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config)
    }

    get<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config)
    }

    post<T = unknown, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.post<T, R>(url, data, config)
    }

    put<T = unknown, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.put<T, R>(url, data, config)
    }

    delete<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config)
    }

    // handle generic app errors depending on the status code
    private handleError(error: AxiosError) {
        if (!error) return

        const { status } = error

        switch (status) {
            case StatusCodes.InternalServerError: {
                // Handle InternalServerError
                break
            }
            case StatusCodes.Forbidden: {
                // Handle Forbidden
                break
            }
            case StatusCodes.Unauthorized: {
                // Handle Unauthorized
                break
            }
            case StatusCodes.TooManyRequests: {
                // Handle TooManyRequests
                break
            }
        }

        return Promise.reject(error)
    }
}

const http = new Http(import.meta.env.VITE_BASE_URL)
export default http