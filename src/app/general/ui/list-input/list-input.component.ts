import { Component, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl } from '@angular/forms';
import { emailPattern } from '../../utils/lib/patterns';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss'],
})
export class ListInputComponent extends InputComponent {
  @Input() override control!: FormControl<Set<string> | null>;
  break = ','

  get items() {
    return Array.from(this.control.value || []);
  }

  keyUp(event: KeyboardEvent, input: HTMLInputElement) {    
    if (event.key === this.break && input.value !== this.break) {
      const item = input.value.replace(this.break, '');
      input.value = '';
      this.control.setValue(new Set([...this.items, item]));
    }
  }

  removeItem(item: string) {
    const list = new Set([...this.items]);
    list.delete(item);
    list.values.length
      ? this.control.setValue(list)
      : this.control.setValue(null);
  }

  validateItem(item: string) {
    return item.match(emailPattern);    
  }
}
