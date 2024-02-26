import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterReducerState, RouterStateSerializer } from "@ngrx/router-store";

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export type RouterState = RouterReducerState<RouterStateUrl>;

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl>{
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let { url, root: state } = routerState;
        let { queryParams } = state;


        while (state.firstChild) {
            state = state.firstChild
        };

        let { params } = state;
        return { url, queryParams, params } as RouterStateUrl;
    }
}