import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { AddToast, AddToastSuccess, RemoveToast, ToastActionTypes } from "./toast.action";
import { IToast, Toast } from "../models/toast";

@Injectable()
export class ToastEffect {
    constructor(
        private actions$: Actions,
    ){}

    addToast$ = createEffect(() => this.actions$.pipe(
        ofType<AddToast>(ToastActionTypes.ADD_TOAST),
        map((action: AddToast) => {
            const toast = new Toast(action.payload);       
            return new AddToastSuccess(toast);
        })
    ));
}
