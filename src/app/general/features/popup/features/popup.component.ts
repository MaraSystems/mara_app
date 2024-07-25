import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() name!: string;
  @Input() heading = '';
  @Input() component!: Type<any>;
  @Input() data!: any;

  componentHolder!: ComponentRef<any>;
  element!: HTMLElement;

  constructor(
    private popupService: PopupService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.popupService.add(this);
  }

  ngAfterViewInit() {    
    this.element = this.el.nativeElement;
    this.close();
  }

  ngOnDestroy(): void {
    this.popupService.remove(this.name);
    this.element.remove();
  }

  open(data: any = {}) {
    this.element.style.display = "flex";
    this.data = { ...this.data, ...data };
  }

  close() {
    this.element.style.display = "none";
    if (this.componentHolder) {
      this.componentHolder.destroy();
    }
  }
}
