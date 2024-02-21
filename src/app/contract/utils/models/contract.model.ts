import { ContractPenalty } from "./contract-penalty";
import { ContractRating } from "./contract-rating";
import { ContractStatus } from "./contract-status.enum";

export class Contract {
    _id!: string;
    projectId!: string;
    userId!: string;
    clientId!: string;
    title!: string;
    description!: string;
    status!: ContractStatus;
    createdAt!: Date;
    updatedAt!: Date;
    image!: string;
    penalty!: ContractPenalty;
    ratings!: ContractRating[];
}