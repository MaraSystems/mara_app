import { GenderEnum } from "src/app/profile/utils/gender.enum";
import { OnboardEnum } from "src/app/profile/utils/onboard.enum";

export interface Client {
    _id: string;
    email: string;
    phone: string;
    username: string
    firstname: string;
    lastname: string;
    createdAt: Date;
    verified: boolean;
    dob: Date;
    street: string;
    city: string;
    state: string;
    country: string;
    gender: GenderEnum;
    business: any; 
    image: string;
    onboard: OnboardEnum;
}