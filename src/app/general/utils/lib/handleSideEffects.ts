import { DataResponse } from "../models/data-response";
import { SideEffects } from "../models/side-effects";

export function handleSuccessSideEffects<T> (sideEffects: SideEffects<T>, response?: DataResponse<T>){
    if (sideEffects.success) {
        sideEffects.success(response);
    }
}

export const handleFailureSideEffects = (sideEffects: SideEffects, error?: string | Error) => {
    if (sideEffects.failure) {
        const message = (error as any).message || error;
        sideEffects.failure(message);
    }
}

function a<T>() {

}
