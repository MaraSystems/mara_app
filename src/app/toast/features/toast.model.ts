import { v4 as uuid } from 'uuid';

interface IToast {
    title: string;
    isError: boolean;
    description: string;
    duration: number;
}

export class Toast {
    id: string = '';

    constructor(
        public data: Partial<IToast>
    ){
        this.id = uuid();
        this.data.duration = 5;
        this.data.isError = this.data.isError 
            ? this.data.isError
            : false;
        this.data.title = this.data.title
            ? this.data.title
            : this.data.isError
                ? 'Failed'
                : 'Successful'
    }
}