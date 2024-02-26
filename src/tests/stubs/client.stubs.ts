import { Client } from "src/app/client/utils/models/client";
import { NewClient } from "src/app/client/utils/models/new-client";

export const newClientStub = () => ({
    email: 'me@mail.com',
    phone: '1234567890',
    username: 'me'
} as NewClient);

export const clientStub = () => ({
    ...newClientStub()
} as Client);