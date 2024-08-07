import { TransactionActionEnum } from "src/app/transaction/utils/models/transaction-action.enum";

export interface WalletTransaction {
    userId: string;
    action: TransactionActionEnum,
    amount: number;
    modelId?: string;
}