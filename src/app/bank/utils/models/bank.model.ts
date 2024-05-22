export interface Bank {
    _id: string;
    userId: string;
    bankName: string;
    accountNumber: number;
    accountName: string;
    default: boolean;
    createdAt: Date;
    updatedAt: Date;
    hidden: boolean;
}