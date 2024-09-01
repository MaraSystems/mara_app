export interface DataResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}