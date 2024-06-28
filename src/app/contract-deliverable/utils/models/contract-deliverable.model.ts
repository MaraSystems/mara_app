
export class ContractDeliverable {
    _id!: string;
    contractId!: string;
    title!: string;
    description!: string;
    duration!: number;
    price!: number;
    documents!: string[];
    image!: string;
    startedAt!: Date;
    finishedAt!: Date;
}