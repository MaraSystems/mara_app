import { FileData } from "src/app/general/utils/models/file-data";

export class ContractDeliverable {
    _id!: string;
    contractId!: string;
    name!: string;
    description!: string;
    duration!: number;
    cost!: number;
    files!: FileData[];
    image!: string;
    likes!: string[];
    startedAt!: Date;
    finishedAt!: Date;
}