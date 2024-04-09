import { NewClient } from "./new-client";

export class Client implements NewClient {
    _id = '';
    email!: string;
    phone!: string;
    username!: string
    firstname!: string;
    lastname!: string;
    createdAt!: Date;
    verified!: boolean;
    dob!: Date;
    street!: string;
    city!: string;
    state!: string;
    country!: string;
    gender!: string;
    business: any; 
    image: string = '../../../../assets//images/db.png';

    constructor () { }
}