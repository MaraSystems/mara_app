export interface IPopup {
    data?: any;
    action: 'open' | 'close' | 'remove';
    tag: string;
    id?: number;
}