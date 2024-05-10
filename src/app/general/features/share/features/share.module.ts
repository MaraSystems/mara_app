import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';
import { ShareLinkModule } from '../ui/share-link/share-link.module';
import { ShareAccessModule } from '../ui/share-access/share-access.module';
import { ShareItemModule } from '../ui/share-item/share-item.module';
import { ShareAddModule } from '../ui/share-add/share-add.module';



@NgModule({
  declarations: [
    ShareComponent
  ],
  imports: [
    CommonModule,
    ShareLinkModule,
    ShareAccessModule,
    ShareItemModule,
    ShareAddModule
  ],
  exports: [
    ShareComponent
  ]
})
export class ShareModule { }
