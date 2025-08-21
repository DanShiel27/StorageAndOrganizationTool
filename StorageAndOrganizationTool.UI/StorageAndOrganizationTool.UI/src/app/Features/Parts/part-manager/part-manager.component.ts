import { Component } from '@angular/core';
import { PartListComponent } from "../part-list/part-list.component";
import { PartFormComponent } from "../part-form/part-form.component";

@Component({
  selector: 'app-part-manager',
  standalone: true,
  imports: [PartListComponent, PartFormComponent],
  templateUrl: './part-manager.component.html',
  styleUrl: './part-manager.component.scss'
})
export class PartManagerComponent {

}
