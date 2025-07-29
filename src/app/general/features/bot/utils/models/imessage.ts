import { MessengerEnum } from './messager.enum';

export interface IMessage {
    _id: string;
    type: MessengerEnum;
    content: string;
}
