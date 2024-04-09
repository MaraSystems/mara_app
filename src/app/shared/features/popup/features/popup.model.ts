import { Component, Type } from '@angular/core';
import { HomeValuesComponent } from 'src/app/home/ui/home-values/home-values.component';
import { v4 as uuid } from 'uuid';

export const PopupEnum = {
    SAMPLE: HomeValuesComponent
}

export class Popup {
    id: string = '';

    constructor(
        public component: any,
        public rank = 1
    ){
        this.id = uuid();
    }
}