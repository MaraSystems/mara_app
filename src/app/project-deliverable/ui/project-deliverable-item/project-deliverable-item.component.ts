import { Component, Input } from '@angular/core';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';

@Component({
  selector: 'app-project-deliverable-item',
  templateUrl: './project-deliverable-item.component.html',
  styleUrls: ['./project-deliverable-item.component.scss']
})
export class ProjectDeliverableItemComponent {
  @Input() deliverable!: ProjectDeliverable;
}
