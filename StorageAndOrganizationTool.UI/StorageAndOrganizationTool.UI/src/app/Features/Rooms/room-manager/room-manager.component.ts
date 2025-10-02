import { Component, inject } from '@angular/core';
import { RoomListComponent } from "../room-list/room-list.component";
import { RoomFormComponent } from "../room-form/room-form.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [RoomListComponent, RoomFormComponent, MatButtonModule],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.scss'
})
export class RoomManagerComponent {
  readonly dialog = inject(MatDialog)

addRoom() {
  const dialogRef = this.dialog.open(RoomFormComponent, {
    height: '80%',
    width: '80%',
    maxHeight: '80vw',
    maxWidth: '80vw'
  })
}

}
