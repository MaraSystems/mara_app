import { SideEffects } from "../models/side.effects";

export const handleSuccessSideEffects = (sideEffects: SideEffects) => {
    if (sideEffects.success) {
        sideEffects.success();
    }
}

export const handleFailureSideEffects = (sideEffects: SideEffects) => {
    if (sideEffects.failure) {
        sideEffects.failure();
    }
}