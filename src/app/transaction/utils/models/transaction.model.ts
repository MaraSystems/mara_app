import { TransactionActionEnum } from "./transaction-action.enum";
import { TransactionModelEnum } from "./transaction-model.enum";
import { TransactionPlatformEnum } from "./transaction-platform.enum";
import { TransactionStatusEnum } from "./transaction-status.enum";

export interface Transaction {
    _id: string;
    userId: string;
    amount: string;
    balance: string;
    action: TransactionActionEnum;
    title: string;
    status: TransactionStatusEnum;
    createdAt: Date;
    updatedAt: Date;
    hidden: boolean;
    nounce: string;
    platform: TransactionPlatformEnum,
    reference: string;
    model: TransactionModelEnum;
    modelId: string;
}