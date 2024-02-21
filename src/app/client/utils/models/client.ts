import { NewClient } from "./new-client";

export class Client implements NewClient {
    _id = '';
    email!: string;
    phone!: string;
    username!: string
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

    constructor (
        
    ) { }
}