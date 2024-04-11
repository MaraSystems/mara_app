import { v4 as uuid } from 'uuid';

export interface IToast {
    isError?: boolean;
    description?: string;
    duration?: number;
}

export class Toast {
    id: string = '';
    title = '';
    duration = 5;
    description = '';
    isError = false;

    constructor(
        public data: Partial<IToast>
    ){        
        const { duration, isError, description } = data;
        this.id = uuid();
        this.duration = duration || 5;
        this.isError = isError || false;
        this.description = description || '';
        this.title = isError
            ? 'Failed'
            : 'Successful'
    }
}