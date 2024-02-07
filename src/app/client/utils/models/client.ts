import { NewClient } from "./new-client";

export class Client implements NewClient {
    _id = '';
    firstname = 'First';
    lastname = 'Last';
    createdAt = new Date();
    verified = true;
    dob = new Date();
    street = 'No. 2 street';
    city = 'City';
    state = 'State';
    country = 'Country';
    gender = 'Gender';
    business: any; 
    image: string = '../../../../assets//images/db.png';

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    get isBusiness() {
        return !!this.business;
    }

    constructor (
        public email: string,
        public phone: string,
        public username: string
    ) { }
}