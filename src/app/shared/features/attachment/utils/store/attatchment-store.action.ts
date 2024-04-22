import { Action } from "@ngrx/store";
import { ListPayload } from "src/app/shared/utils/models/list-payload";
import { Update } from "@ngrx/entity";
import { Attachment } from "../models/attatchment.model";
import { UploadData } from "../models/upload-data";
import { DownloadData } from "../models/download-data";

export enum AttachmentActionsType {
    UPLOAD_ATTACHMENT = "[ATTACHMENT] Upload Attachment",
    UPLOAD_ATTACHMENT_SUCCESS = "[ATTACHMENT] Upload Attachment Success",
    UPLOAD_ATTACHMENT_FAIL = "[ATTACHMENT] Upload Attachment Fail",

    DOWNLOAD_ATTACHMENT = "[ATTACHMENT] Download Attachment",
    DOWNLOAD_ATTACHMENT_SUCCESS = "[ATTACHMENT] Download Attachment Success",
    DOWNLOAD_ATTACHMENT_FAIL = "[ATTACHMENT] Download Attachment Fail",

    GET_ATTACHMENT = "[ATTACHMENT] Get Attachment",
    GET_ATTACHMENT_SUCCESS = "[ATTACHMENT] Get Attachment Success",
    GET_ATTACHMENT_FAIL = "[ATTACHMENT] Get Attachment Fail",

    DELETE_ATTACHMENT = "[ATTACHMENT] Delete Attachment",
    DELETE_ATTACHMENT_SUCCESS = "[ATTACHMENT] Delete Attachment Success",
    DELETE_ATTACHMENT_FAIL = "[ATTACHMENT] Delete Attachment Fail",

    LIST_ATTACHMENTS = "[ATTACHMENT] List Attachments",
    LIST_ATTACHMENTS_SUCCESS = "[ATTACHMENT] List Attachments Success",
    LIST_ATTACHMENTS_FAIL = "[ATTACHMENT] List Attachments Fail"
}

export class UploadAttachmentAction implements Action {
    readonly type = AttachmentActionsType.UPLOAD_ATTACHMENT;
    constructor(public payload: UploadData, public popup: string){}
}

export class UploadAttachmentActionSuccess implements Action {
    readonly type = AttachmentActionsType.UPLOAD_ATTACHMENT_SUCCESS;
    constructor(public payload: Attachment, public id?: string){}
}

export class UploadAttachmentActionFail implements Action {
    readonly type = AttachmentActionsType.UPLOAD_ATTACHMENT_FAIL;
    constructor(public payload: string){}
}

export class DownloadAttachmentAction implements Action {
    readonly type = AttachmentActionsType.DOWNLOAD_ATTACHMENT;
    constructor(public payload: DownloadData, public popup: string){}
}

export class DownloadAttachmentActionSuccess implements Action {
    readonly type = AttachmentActionsType.DOWNLOAD_ATTACHMENT_SUCCESS;
    constructor(public payload: Update<Attachment>){}
}

export class DownloadAttachmentActionFail implements Action {
    readonly type = AttachmentActionsType.DOWNLOAD_ATTACHMENT_FAIL;
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
    constructor(public model: string, public modelId: string, public payload?: ListPayload){}
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

export type AttachmentAction = 
UploadAttachmentAction |
UploadAttachmentActionSuccess |
UploadAttachmentActionFail |
DownloadAttachmentAction |
DownloadAttachmentActionSuccess |
DownloadAttachmentActionFail |
GetAttachmentAction |
GetAttachmentActionSuccess |
GetAttachmentActionFail |
DeleteAttachmentAction |
DeleteAttachmentActionSuccess |
DeleteAttachmentActionFail;