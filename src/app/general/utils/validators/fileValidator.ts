import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fileValidator(data: { max?: number, min?: number }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string[] = control.value || [];        

        if (data.max && value.length > data.max) {
            return { maxfiles: { max: data.max, actual: value.length } };
        }

        if (data.min && value.length < data.min) {
            return { minfiles: { min: data.min, actual: value.length } };
        }
        
        return null;
    }
}