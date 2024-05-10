import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { emailPattern } from "../lib/patterns";

export function listValidator(data: { type?: 'email' | 'text', max?: number, min?: number }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const list: string[] = Array.from(control.value || []); 
        
        if (data.max && list.length > data.max) {
            return { maxItems: { max: data.max, actual: list.length } };
        }

        if (data.min && list.length < data.min) {
            return { minItems: { min: data.min, actual: list.length } };
        }

        if (data.type === 'email') {
            const flag = list.every(item => !!item.match(emailPattern));            
            if (!flag) {
                return { list: { type: data.type, flag } };
            }
        }
        
        return null;
    }
}