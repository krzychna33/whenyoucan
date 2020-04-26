export interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
}

export interface ApiErrorResponse {
    message: string
}