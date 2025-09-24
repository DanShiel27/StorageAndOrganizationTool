import { Component } from '@angular/core';
import { RoomListComponent } from "../room-list/room-list.component";
import { RoomFormComponent } from "../room-form/room-form.component";

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [RoomListComponent, RoomFormComponent],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.scss'
})
export class RoomManagerComponent {

}
