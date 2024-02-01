import { NewClient } from "./new-client";

export class Client implements NewClient {
    constructor (
        public email: string,
        public phone: string,
        public username: string
    ) { }
}