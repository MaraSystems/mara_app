import { GenderType } from "src/app/profile/utils/gender-type";
import { OnboardStatus } from "src/app/profile/utils/onboard-status";
import { Compliance } from "./compliance";

export interface Client {
    _id: string;
    email: string;
    phone: string;
    username: string
    firstname: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    dob: Date;
    street: string;
    city: string;
    state: string;
    country: string;
    gender: GenderType;
    business: any; 
    image: string;
    onboard: OnboardStatus;
    compliances: Compliance[];
}