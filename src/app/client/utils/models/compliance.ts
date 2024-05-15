export enum IdentificationComplianceEnum {
    INTERNATIONAL_PASSPORT='International Passport',
    DRIVERS_LICENSE=`Driver's License`,
    NATIONAL_IDENTIFICATION='National Identification'
}

export enum SupportComplianceEnum {
    UTILITY_BILL='Utility Bill',
    BANK_STATMENT='Bank Statement',
}

export enum ComplianceEnum {
    IDENTIFICATION='Identification',
    SUPPORT='Support'
}

export enum ComplianceStatusEnum {
    PENDING='Pending',
    REJECTED='Rejected',
    APPROVED='Approved'
};

export interface Compliance {
    _id: string;
    userId: string;
    model: ComplianceEnum;
    modelType: IdentificationComplianceEnum | SupportComplianceEnum;
    createdAt: Date;
    updatedAt: Date;
    status: ComplianceStatusEnum;
    expiresAt?: Date;
    rejectionReasons: string[];
}