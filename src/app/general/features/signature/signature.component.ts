import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { Client } from 'src/app/client/utils/models/client';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { CreateComplianceAction, GetComplianceAction } from 'src/app/profile/features/compliance/utils/store/compliance-store.action';
import { GetAttachmentAction } from '../attachment/utils/store/attachment-store.action';
import { Compliance, ComplianceModel, ComplianceStatusEnum, ComplianceTitleEnum } from 'src/app/client/utils/models/compliance';
import { UnSubscriber } from '../../utils/services/unsubscriber.service';
import { selectAttachmentById } from '../attachment/utils/store/attachment-store.selector';
import { AddToast } from '../toast/utils/store/toast.action';

export interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent extends UnSubscriber implements OnInit, AfterViewInit {
  @Input() compliance!: Compliance | undefined;
  @Output() signed = new EventEmitter();

  client!: Client;
  signature = '';

  context!: CanvasRenderingContext2D;
  trackMouse = false;
  fonts: string[] = [
    "Playwrite HR",
    "Playwrite DK Loopet",
    "Playwrite HR Lijeva",
    "Playwrite BE VLG",
    "Playwrite CU"
  ];
  lastPoint!: Point;
  selectedFont = 'custom';
  height = 150;
  width = 400;

  constructor(
    private elementRef: ElementRef,
    private store: Store
  ) { 
    super();
  }

  ngOnInit(): void {
    this.store.select(selectAuthClient).subscribe(client => {
      this.client = client;
      this.store.dispatch(new GetAttachmentAction(this.compliance?.attachment as string));
      this.newSubscription = this.store.select(selectAttachmentById(this.compliance?.attachment as string)).subscribe(attachment => {        
        if (attachment) {
          // this.signature = attachment.versions[attachment.versions.length - 1].url as string;
        }
      });
    });   
  }

  ngAfterViewInit(){
    const element = this.elementRef.nativeElement as HTMLElement;
    const canvas = element.querySelector('#canvas') as HTMLCanvasElement;
    
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.context.strokeStyle = 'white';
    this.context.lineWidth = 1;
    this.context.lineCap = 'round';
    this.context.canvas.height = this.height;
    this.width = this.context.canvas.width;    

    this.draw();
  }

  draw(){    
    this.context.canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.trackMouse = true;
      this.lastPoint = this.getPoint(event);

      this.context.canvas.addEventListener("mousemove", this.drawTracks, false);
    });

    this.context.canvas.addEventListener("mouseup",  (event: MouseEvent) => {
      this.trackMouse = false;
      this.context.canvas.removeEventListener("mousemove", this.drawTracks, false);
    });

    this.setFont();
  } 

  drawTracks  = (event: MouseEvent) => {
    if(!this.trackMouse || this.selectedFont !== 'custom') return;
    
    this.context.beginPath();
    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);

    const point = this.getPoint(event);
    this.context.lineTo(point.x, point.y);

    this.context.closePath();
    this.context.stroke();

    this.lastPoint = point;
  }

  getPoint(event: MouseEvent) {
    const x = event.clientX - this.context.canvas.getBoundingClientRect().left;
    const y = event.clientY - this.context.canvas.getBoundingClientRect().top;

    return { x, y } as Point;
  }

  setImage () {
    const img = document.createElement('img');
    img.src = this.signature;

    img.addEventListener('load', () => {
      this.context.drawImage(img, 0, 0);
    });
  }

  setFont(font = 'custom') {
    const name = this.client.firstname+this.client.lastname;
    this.selectedFont = font
    this.context.clearRect(0, 0, this.width, this.height);

    if (font === 'custom') {
      this.setImage();
    }
    else {
      this.context.fillStyle = 'var(--color-white)';
      this.context.font = `30px ${font}`;
      this.context.fillText(name, this.width/10, this.height/2);      
    }
  }

  updateSignature() {
    this.signature = this.context.canvas.toDataURL();  
    const compliance: Compliance = { userId: this.client._id, model: ComplianceModel.SIGNATURE, status: ComplianceStatusEnum.PENDING, hidden: false, title: ComplianceTitleEnum.SIGNATURE, ...this.compliance } as any;
    
    this.store.dispatch(new CreateComplianceAction({ compliance, document: this.signature }, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Signature upload successful'}));
        this.signed.emit();
      }, 
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Signature upload failed'}));
      }
    }));
  }
}
