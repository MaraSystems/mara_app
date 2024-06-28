import { RateEnum } from "src/app/general/utils/models/rate.enum";
import { ContractPenalty } from "./contract-penalty";
import { ContractStatus } from "./contract-status.enum";

export interface ContractRequest {
    projectId: string;
    clientId: string;
    deliverables: string[];
}

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
    clientRating: RateEnum;
    contractorRating: RateEnum;
}