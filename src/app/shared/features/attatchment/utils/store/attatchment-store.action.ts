import { Action } from "@ngrx/store";
import { ListPayload } from "src/app/shared/utils/models/list-payload";
import { Update } from "@ngrx/entity";
import { Attatchment } from "../models/attatchment.model";
import { UploadData } from "../models/upload-data";
import { DownloadData } from "../models/download-data";

export enum AttatchmentActionsType {
    UPLOAD_ATTATCHMENT = "[ATTATCHMENT] Upload Attatchment",
    UPLOAD_ATTATCHMENT_SUCCESS = "[ATTATCHMENT] Upload Attatchment Success",
    UPLOAD_ATTATCHMENT_FAIL = "[ATTATCHMENT] Upload Attatchment Fail",

    DOWNLOAD_ATTATCHMENT = "[ATTATCHMENT] Download Attatchment",
    DOWNLOAD_ATTATCHMENT_SUCCESS = "[ATTATCHMENT] Download Attatchment Success",
    DOWNLOAD_ATTATCHMENT_FAIL = "[ATTATCHMENT] Download Attatchment Fail",

    GET_ATTATCHMENT = "[ATTATCHMENT] Get Attatchment",
    GET_ATTATCHMENT_SUCCESS = "[ATTATCHMENT] Get Attatchment Success",
    GET_ATTATCHMENT_FAIL = "[ATTATCHMENT] Get Attatchment Fail",

    DELETE_ATTATCHMENT = "[ATTATCHMENT] Delete Attatchment",
    DELETE_ATTATCHMENT_SUCCESS = "[ATTATCHMENT] Delete Attatchment Success",
    DELETE_ATTATCHMENT_FAIL = "[ATTATCHMENT] Delete Attatchment Fail",

    LIST_ATTATCHMENTS = "[ATTATCHMENT] List Attatchments",
    LIST_ATTATCHMENTS_SUCCESS = "[ATTATCHMENT] List Attatchments Success",
    LIST_ATTATCHMENTS_FAIL = "[ATTATCHMENT] List Attatchments Fail"
}

export class UploadAttatchmentAction implements Action {
    readonly type = AttatchmentActionsType.UPLOAD_ATTATCHMENT;
    constructor(public payload: UploadData, public popup: string){}
}

export class UploadAttatchmentActionSuccess implements Action {
    readonly type = AttatchmentActionsType.UPLOAD_ATTATCHMENT_SUCCESS;
    constructor(public payload: Attatchment, public id?: string){}
}

export class UploadAttatchmentActionFail implements Action {
    readonly type = AttatchmentActionsType.UPLOAD_ATTATCHMENT_FAIL;
    constructor(public payload: string){}
}

export class DownloadAttatchmentAction implements Action {
    readonly type = AttatchmentActionsType.DOWNLOAD_ATTATCHMENT;
    constructor(public payload: DownloadData, public popup: string){}
}

export class DownloadAttatchmentActionSuccess implements Action {
    readonly type = AttatchmentActionsType.DOWNLOAD_ATTATCHMENT_SUCCESS;
    constructor(public payload: Update<Attatchment>){}
}

export class DownloadAttatchmentActionFail implements Action {
    readonly type = AttatchmentActionsType.DOWNLOAD_ATTATCHMENT_FAIL;
    constructor(public payload: string){}
}

export class GetAttatchmentAction implements Action {
    readonly type = AttatchmentActionsType.GET_ATTATCHMENT;
    constructor(public payload: string){}
}

export class GetAttatchmentActionSuccess implements Action {
    readonly type = AttatchmentActionsType.GET_ATTATCHMENT_SUCCESS;
    constructor(public payload: Attatchment){}
}

export class GetAttatchmentActionFail implements Action {
    readonly type = AttatchmentActionsType.GET_ATTATCHMENT_FAIL;
    constructor(public payload: string){}
}

export class ListAttatchmentsAction implements Action {
    readonly type = AttatchmentActionsType.LIST_ATTATCHMENTS;
    constructor(public model: string, public modelId: string, public payload?: ListPayload){}
}

export class ListAttatchmentsActionSuccess implements Action {
    readonly type = AttatchmentActionsType.LIST_ATTATCHMENTS_SUCCESS;
    constructor(public payload: Attatchment[]){}
}

export class ListAttatchmentsActionFail implements Action {
    readonly type = AttatchmentActionsType.LIST_ATTATCHMENTS_FAIL;
    constructor(public payload: string){}
}

export class DeleteAttatchmentAction implements Action {
    readonly type = AttatchmentActionsType.DELETE_ATTATCHMENT;
    constructor(public payload: string){}
}

export class DeleteAttatchmentActionSuccess implements Action {
    readonly type = AttatchmentActionsType.DELETE_ATTATCHMENT_SUCCESS;
    constructor(public payload: Attatchment){}
}

export class DeleteAttatchmentActionFail implements Action {
    readonly type = AttatchmentActionsType.DELETE_ATTATCHMENT_FAIL;
    constructor(public payload: string){}
}

export type AttatchmentAction = 
UploadAttatchmentAction |
UploadAttatchmentActionSuccess |
UploadAttatchmentActionFail |
DownloadAttatchmentAction |
DownloadAttatchmentActionSuccess |
DownloadAttatchmentActionFail |
GetAttatchmentAction |
GetAttatchmentActionSuccess |
GetAttatchmentActionFail |
DeleteAttatchmentAction |
DeleteAttatchmentActionSuccess |
DeleteAttatchmentActionFail;