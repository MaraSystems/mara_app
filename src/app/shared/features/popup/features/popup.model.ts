export interface IPopup {
    id: string,
    data?: any;
    action: 'open' | 'close' | 'remove'
}