enum RateEnum {
    VERY_BAD = 1,
    BAD = 2,
    OK = 3,
    GOOD = 4,
    VERY_GOOD = 5
}

export interface ContractRating {
    userId: string;
    rate:  RateEnum;
}