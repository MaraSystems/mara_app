import { RateType } from "src/app/general/utils/models/rate-type";
import { ContractPenalty } from "./contract-penalty";
import { ContractStatus } from "./contract-status";
import { ContractSignature } from "./contract-signature";

export interface Contract {
    _id: string;
    projectId: string;
    contractorId: string;
    clientId: string;
    title: string;
    description: string;
    status: ContractStatus;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    penalty: ContractPenalty;
    clientRating: RateType;
    contractorRating: RateType;
    clientSignature: ContractSignature;
    contractorSignature: ContractSignature;
    approvedAt: Date;
    initiatedAt: Date;
    terminatedAt: Date;
}