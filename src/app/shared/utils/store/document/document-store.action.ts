import { Action } from "@ngrx/store";
import { ListPayload } from "src/app/shared/utils/models/list-payload";
import { DocumentData } from "../../models/document-data";
import { Update } from "@ngrx/entity";
import { UploadData } from "../../models/upload-data";
import { DownloadData } from "../../models/download-data";

export enum DocumentActionsType {
    UPLOAD_DOCUMENT = "[DOCUMENT] Upload Document",
    UPLOAD_DOCUMENT_SUCCESS = "[DOCUMENT] Upload Document Success",
    UPLOAD_DOCUMENT_FAIL = "[DOCUMENT] Upload Document Fail",

    DOWNLOAD_DOCUMENT = "[DOCUMENT] Download Document",
    DOWNLOAD_DOCUMENT_SUCCESS = "[DOCUMENT] Download Document Success",
    DOWNLOAD_DOCUMENT_FAIL = "[DOCUMENT] Download Document Fail",

    GET_DOCUMENT = "[DOCUMENT] Get Document",
    GET_DOCUMENT_SUCCESS = "[DOCUMENT] Get Document Success",
    GET_DOCUMENT_FAIL = "[DOCUMENT] Get Document Fail",

    DELETE_DOCUMENT = "[DOCUMENT] Delete Document",
    DELETE_DOCUMENT_SUCCESS = "[DOCUMENT] Delete Document Success",
    DELETE_DOCUMENT_FAIL = "[DOCUMENT] Delete Document Fail",

    LIST_DOCUMENTS = "[DOCUMENT] List Documents",
    LIST_DOCUMENTS_SUCCESS = "[DOCUMENT] List Documents Success",
    LIST_DOCUMENTS_FAIL = "[DOCUMENT] List Documents Fail"
}

export class UploadDocumentAction implements Action {
    readonly type = DocumentActionsType.UPLOAD_DOCUMENT;
    constructor(public payload: UploadData, public popup: string){}
}

export class UploadDocumentActionSuccess implements Action {
    readonly type = DocumentActionsType.UPLOAD_DOCUMENT_SUCCESS;
    constructor(public payload: DocumentData){}
}

export class UploadDocumentActionFail implements Action {
    readonly type = DocumentActionsType.UPLOAD_DOCUMENT_FAIL;
    constructor(public payload: string){}
}

export class DownloadDocumentAction implements Action {
    readonly type = DocumentActionsType.DOWNLOAD_DOCUMENT;
    constructor(public payload: DownloadData, public popup: string){}
}

export class DownloadDocumentActionSuccess implements Action {
    readonly type = DocumentActionsType.DOWNLOAD_DOCUMENT_SUCCESS;
    constructor(public payload: Update<DocumentData>){}
}

export class DownloadDocumentActionFail implements Action {
    readonly type = DocumentActionsType.DOWNLOAD_DOCUMENT_FAIL;
    constructor(public payload: string){}
}

export class GetDocumentAction implements Action {
    readonly type = DocumentActionsType.GET_DOCUMENT;
    constructor(public payload: string){}
}

export class GetDocumentActionSuccess implements Action {
    readonly type = DocumentActionsType.GET_DOCUMENT_SUCCESS;
    constructor(public payload: DocumentData){}
}

export class GetDocumentActionFail implements Action {
    readonly type = DocumentActionsType.GET_DOCUMENT_FAIL;
    constructor(public payload: string){}
}

export class ListDocumentsAction implements Action {
    readonly type = DocumentActionsType.LIST_DOCUMENTS;
    constructor(public model: string, public modelId: string, public payload?: ListPayload){}
}

export class ListDocumentsActionSuccess implements Action {
    readonly type = DocumentActionsType.LIST_DOCUMENTS_SUCCESS;
    constructor(public payload: DocumentData[]){}
}

export class ListDocumentsActionFail implements Action {
    readonly type = DocumentActionsType.LIST_DOCUMENTS_FAIL;
    constructor(public payload: string){}
}

export class DeleteDocumentAction implements Action {
    readonly type = DocumentActionsType.DELETE_DOCUMENT;
    constructor(public payload: string){}
}

export class DeleteDocumentActionSuccess implements Action {
    readonly type = DocumentActionsType.DELETE_DOCUMENT_SUCCESS;
    constructor(public payload: DocumentData){}
}

export class DeleteDocumentActionFail implements Action {
    readonly type = DocumentActionsType.DELETE_DOCUMENT_FAIL;
    constructor(public payload: string){}
}

export type DocumentAction = 
UploadDocumentAction |
UploadDocumentActionSuccess |
UploadDocumentActionFail |
DownloadDocumentAction |
DownloadDocumentActionSuccess |
DownloadDocumentActionFail |
GetDocumentAction |
GetDocumentActionSuccess |
GetDocumentActionFail |
DeleteDocumentAction |
DeleteDocumentActionSuccess |
DeleteDocumentActionFail;