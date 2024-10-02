import { Action } from "@ngrx/store";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { Update } from "@ngrx/entity";
import { Attachment } from "../models/attachment";
import { UploadData } from "../models/upload-data";
import { DownloadData } from "../models/download-data";
import { SideEffects } from "src/app/general/utils/models/side-effects";
import { AttachmentType } from "../models/attachment-type";

export enum AttachmentActionsType {
    UPLOAD_ATTACHMENT = "[ATTACHMENT] Upload Attachment",
    UPLOAD_ATTACHMENT_SUCCESS = "[ATTACHMENT] Upload Attachment Success",
    UPLOAD_ATTACHMENT_FAIL = "[ATTACHMENT] Upload Attachment Fail",

    GET_ATTACHMENT = "[ATTACHMENT] Get Attachment",
    GET_ATTACHMENT_SUCCESS = "[ATTACHMENT] Get Attachment Success",
    GET_ATTACHMENT_FAIL = "[ATTACHMENT] Get Attachment Fail",

    DELETE_ATTACHMENT = "[ATTACHMENT] Delete Attachment",
    DELETE_ATTACHMENT_SUCCESS = "[ATTACHMENT] Delete Attachment Success",
    DELETE_ATTACHMENT_FAIL = "[ATTACHMENT] Delete Attachment Fail",

    UPDATE_ATTACHMENT = "[ATTACHMENT] Update Attachment",
    UPDATE_ATTACHMENT_SUCCESS = "[ATTACHMENT] Update Attachment Success",
    UPDATE_ATTACHMENT_FAIL = "[ATTACHMENT] Update Attachment Fail",

    LIST_ATTACHMENTS = "[ATTACHMENT] List Attachments",
    LIST_ATTACHMENTS_SUCCESS = "[ATTACHMENT] List Attachments Success",
    LIST_ATTACHMENTS_FAIL = "[ATTACHMENT] List Attachments Fail"
}

export class UploadAttachmentAction implements Action {
    readonly type = AttachmentActionsType.UPLOAD_ATTACHMENT;
    constructor(public payload: UploadData, public sideEffects = new SideEffects()){}
}

export class UploadAttachmentActionSuccess implements Action {
    readonly type = AttachmentActionsType.UPLOAD_ATTACHMENT_SUCCESS;
    constructor(public payload: Attachment, public id?: string){}
}

export class UploadAttachmentActionFail implements Action {
    readonly type = AttachmentActionsType.UPLOAD_ATTACHMENT_FAIL;
    constructor(public payload: string){}
}

export class GetAttachmentAction implements Action {
    readonly type = AttachmentActionsType.GET_ATTACHMENT;
    constructor(public payload: string){}
}

export class GetAttachmentActionSuccess implements Action {
    readonly type = AttachmentActionsType.GET_ATTACHMENT_SUCCESS;
    constructor(public payload: Attachment){}
}

export class GetAttachmentActionFail implements Action {
    readonly type = AttachmentActionsType.GET_ATTACHMENT_FAIL;
    constructor(public payload: string){}
}

export class ListAttachmentsAction implements Action {
    readonly type = AttachmentActionsType.LIST_ATTACHMENTS;
    constructor(public model: AttachmentType, public modelId: string, public payload?: ListOptions){}
}

export class ListAttachmentsActionSuccess implements Action {
    readonly type = AttachmentActionsType.LIST_ATTACHMENTS_SUCCESS;
    constructor(public payload: Attachment[]){}
}

export class ListAttachmentsActionFail implements Action {
    readonly type = AttachmentActionsType.LIST_ATTACHMENTS_FAIL;
    constructor(public payload: string){}
}

export class DeleteAttachmentAction implements Action {
    readonly type = AttachmentActionsType.DELETE_ATTACHMENT;
    constructor(public payload: string){}
}

export class DeleteAttachmentActionSuccess implements Action {
    readonly type = AttachmentActionsType.DELETE_ATTACHMENT_SUCCESS;
    constructor(public payload: Attachment){}
}

export class DeleteAttachmentActionFail implements Action {
    readonly type = AttachmentActionsType.DELETE_ATTACHMENT_FAIL;
    constructor(public payload: string){}
}

export class UpdateAttachmentAction implements Action {
    readonly type = AttachmentActionsType.UPDATE_ATTACHMENT;
    constructor(public payload: Update<Attachment>, public sideEffects = new SideEffects()){}
}

export class UpdateAttachmentActionSuccess implements Action {
    readonly type = AttachmentActionsType.UPDATE_ATTACHMENT_SUCCESS;
    constructor(public payload: Update<Attachment>){}
}

export class UpdateAttachmentActionFail implements Action {
    readonly type = AttachmentActionsType.UPDATE_ATTACHMENT_FAIL;
    constructor(public payload: string){}
}

export type AttachmentAction = 
UploadAttachmentAction |
UploadAttachmentActionSuccess |
UploadAttachmentActionFail |
GetAttachmentAction |
GetAttachmentActionSuccess |
GetAttachmentActionFail |
DeleteAttachmentAction |
DeleteAttachmentActionSuccess |
DeleteAttachmentActionFail;