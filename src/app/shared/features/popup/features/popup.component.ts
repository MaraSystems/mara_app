import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() name!: string;
  @Input() component!: Type<any>;
  @Input() data!: any;

  @ViewChild("body", { read: ViewContainerRef }) bodyRef!: ViewContainerRef;

  componentHolder!: ComponentRef<any>;
  element!: HTMLElement;

  constructor(
    private popupService: PopupService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private el: ElementRef
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

    if (this.component) {
      const c = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.componentHolder = this.bodyRef.createComponent(c);
      this.componentHolder.instance.data = data;
    }
  }

  close() {
    this.element.style.display = "none";
    if (this.componentHolder) {
      this.componentHolder.destroy();
    }
  }
}
