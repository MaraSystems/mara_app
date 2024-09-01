import { DataResponse } from "./data-response";

export class SideEffects <T = any> {
    success? = (response?: DataResponse<T>) => {};
    failure? = (error?: string) => {};
}