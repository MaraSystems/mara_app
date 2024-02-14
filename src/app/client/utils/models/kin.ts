
export class Kin {
    _id = '';
    userId = '';
    firstname = 'First';
    lastname = 'Last';
    createdAt = new Date();
    dob = new Date();
    street = 'No. 2 street';
    city = 'City';
    state = 'State';
    country = 'Country';
    gender = 'Gender';
    image: string = '../../../../assets//images/db.png';
    relationship = 'Sibling';

    constructor (
        public email: string,
        public phone: string,
    ) { }
}