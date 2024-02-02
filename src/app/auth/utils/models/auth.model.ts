import { Client } from "src/app/client/utils/models/client";

export interface Auth {
    token: string;
    client: Client;
}