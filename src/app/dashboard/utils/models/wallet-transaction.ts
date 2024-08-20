import { TransactionAction } from "src/app/transaction/utils/models/transaction-action";

export interface WalletTransaction {
    userId: string;
    action: TransactionAction,
    amount: number;
    modelId?: string;
}