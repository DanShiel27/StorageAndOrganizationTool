import { inject, Injectable } from '@angular/core';
import { RoomDataAccessService } from './room-data-access.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomDto } from '../../../Core/Models';

@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {

  constructor() { }
  private roomDataAccess = inject(RoomDataAccessService);

  private roomSubject: BehaviorSubject<RoomDto[]> = new BehaviorSubject<RoomDto[]>([])

  public getRoomListObservable(): Observable<RoomDto[]>{
    return this.roomSubject.asObservable();
  }

  public getRooms(){
    this.roomDataAccess.getRooms().subscribe(rooms=>{
      this.roomSubject.next(rooms);
    })
  }
}
