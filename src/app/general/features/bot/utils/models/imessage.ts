import { MessengerEnum } from './messager.enum';

export interface IMessage {
    _id: string;
    type: MessengerEnum;
    content: string;
}

export interface ISendMessageParams {
  message: string;
  sessionId: string;
}
