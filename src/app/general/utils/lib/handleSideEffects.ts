import { SideEffects } from "../models/side-effects";

export const handleSuccessSideEffects = (sideEffects: SideEffects, message?: string) => {
    if (sideEffects.success) {
        sideEffects.success(message);
    }
}

export const handleFailureSideEffects = (sideEffects: SideEffects, error?: string | Error) => {    
    if (sideEffects.failure) {
        const message = (error as any).message || error;
        sideEffects.failure(message);
    }
}