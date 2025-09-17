import { Component } from '@angular/core';
import { RoomListComponent } from "../room-list/room-list.component";

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [RoomListComponent],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.scss'
})
export class RoomManagerComponent {

}
