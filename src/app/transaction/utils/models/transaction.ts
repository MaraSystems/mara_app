import { TransactionAction } from "./transaction-action";
import { TransactionPlatform } from "./transaction-platform";
import { TransactionStatus } from "./transaction-status";
import { TransactionType } from "./transaction-type";


export interface Transaction {
    _id: string;
    userId: string;
    amount: number;
    balance: number;
    action: TransactionAction;
    title: string;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
    hidden: boolean;
    nounce: string;
    platform: TransactionPlatform,
    reference: string;
    model: TransactionType;
    modelId: string;
}