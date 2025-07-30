import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { LocalAccessService } from "src/app/general/utils/services/local-access.service";
import { AccessService } from "src/app/general/utils/services/access.service";
import { ApiAccessService } from "src/app/general/utils/services/api-access.service";
import { BotActionsType, SendMessageAction, SendMessageActionFail, SendMessageActionSuccess } from "./bot.action";
import { IMessage } from "../models/imessage";

@Injectable()
export class BotStoreEffect extends AccessService {
    constructor(
        private actions$: Actions,
        localAccessService: LocalAccessService,
        apiAccessService: ApiAccessService,
    ){
      super(localAccessService, apiAccessService);
    }

    sendMessage$ = createEffect(() => this.actions$.pipe(
        ofType<SendMessageAction>(BotActionsType.SEND_MESSAGE),
        mergeMap((action: SendMessageAction) =>
            this.api.sendMessage(action.payload).pipe(
                map((response: DataResponse<string>) => {
                    handleSuccessSideEffects((action as SendMessageAction).sideEffects);
                    return new SendMessageActionSuccess(response.data);
                }),
                catchError(err => of(new SendMessageActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as SendMessageAction).sideEffects, err);
                    })
                ))
            )
        )
    ));
}
