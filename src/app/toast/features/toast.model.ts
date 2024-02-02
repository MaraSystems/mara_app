import { v4 as uuid } from 'uuid';

export class Toast {
    id: string = '';

    constructor(
        public title: string,
        public isError = false,
        public description = '',
        public duration = 10000
    ){
        this.id = uuid();
    }
}