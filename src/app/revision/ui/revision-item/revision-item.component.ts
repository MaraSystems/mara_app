import { Component, Input } from '@angular/core';
import { Revision } from '../../utils/models/revision';

@Component({
  selector: 'app-revision-item',
  templateUrl: './revision-item.component.html',
  styleUrls: ['./revision-item.component.scss']
})
export class RevisionItemComponent {
  @Input() deliverable!: Revision;
}
