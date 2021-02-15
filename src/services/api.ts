import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

const createHttpClient = (
    config: AxiosRequestConfig,
    onlyData: boolean = true
): AxiosInstance => {
    const instance: AxiosInstance = axios.create(config);

    instance.interceptors.response.use(
        (response: AxiosResponse) => onlyData ? response.data : response,
        (erro: unknown) => Promise.reject(erro)
    )

    return instance;
}

export default createHttpClient;