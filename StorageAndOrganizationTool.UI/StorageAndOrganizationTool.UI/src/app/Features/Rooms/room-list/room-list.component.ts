import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RoomService } from '../Services/roomservice.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoomDto } from '../../../Core/Models';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {

  private roomService = inject(RoomService);
  private destroyRef = inject(DestroyRef);

  displayedColumns = ["id", "name", "description", "pictureNumber", "edit"];

  dataSource = new MatTableDataSource<RoomDto>([]);

  //acts as a way to pass data from the singleton service into the datasource our table uses
  private roomList$ = this.roomService.getRoomListObservable().pipe(
    takeUntilDestroyed(this.destroyRef),
    map(list =>{
      this.dataSource.data = list
    })
  ).subscribe();

  getRooms() {
    this.roomService.getRooms();
  }

  editRoom(roomToEdit: RoomDto) {
    console.log(roomToEdit)
  }

  ngOnInit(): void {
    this.roomService.getRooms();
  }
}
