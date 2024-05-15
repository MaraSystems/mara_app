import { FormControl, FormGroup } from "@angular/forms";

export const getFormControl = (form: FormGroup, name: string) => {
    const control = form.controls[name] as FormControl;
    if (!control) {
        throw new Error('Form control not found');
    }
    
    return control;
}