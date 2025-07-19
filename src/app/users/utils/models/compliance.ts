export enum IdentificationComplianceEnum {
    INTERNATIONAL_PASSPORT='International Passport',
    DRIVING_LICENCE = 'Driving Licence',
    NATIONAL_IDENTIFICATION='National Identification'
}

export enum AddressComplianceEnum {
    UTILITY_BILL='Utility Bill',
    BANK_STATMENT='Bank Statement',
}

export enum ComplianceModel {
    IDENTIFICATION='Identification',
    ADDRESS='Address',
    BANKING='Banking',
    SIGNATURE='Signature',
    COMPANY_INCORPORATION = 'Company Incorporation',
    BOARD_RESOLUTION = 'Board Resolution',
    ARTICLE_OF_ASSOCIATION = 'Article Of Association'
}

export enum ComplianceStatusEnum {
    PENDING='Pending',
    REJECTED='Rejected',
    APPROVED='Approved'
};

export enum ComplianceTitleEnum {
    DRIVING_LICENCE = 'Driving Licence',
    NATIONAL_IDENTIFICATION='National Identification',
    INTERNATIONAL_PASSPORT='International Passport',
    UTILITY_BILL='Utility Bill',
    BANK_STATMENT='Bank Statement',
    SIGNATURE='Signature',
    COMPANY_INCORPORATION = 'Company Incorporation',
    BOARD_RESOLUTION = 'Board Resolution',
    ARTICLE_OF_ASSOCIATION = 'Article Of Association'
}

export interface Compliance {
    _id: string;
    userId: string;
    model: ComplianceModel;
    title: ComplianceTitleEnum;
    createdAt: Date;
    updatedAt: Date;
    status: ComplianceStatusEnum;
    hidden: boolean;
    expiresAt?: Date;
    attachment: string;
}