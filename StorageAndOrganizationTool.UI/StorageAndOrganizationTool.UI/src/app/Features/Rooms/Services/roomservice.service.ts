import { inject, Injectable } from '@angular/core';
import { RoomDataAccessService } from './room-data-access.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RoomDto } from '../../../Core/Models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }
  private roomDataAccess = inject(RoomDataAccessService);

  private roomSubject$: BehaviorSubject<RoomDto[]> = new BehaviorSubject<RoomDto[]>([])
  private isAddedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getRoomListObservable(): Observable<RoomDto[]>{
    return this.roomSubject$.asObservable();
  }

  public getIsAddedObservable(): Observable<boolean>{
    return this.isAddedSubject$.asObservable();
  }

  public getRooms(){
    this.roomDataAccess.getRooms().subscribe(rooms=>{
      this.roomSubject$.next(rooms);
    })
  }

  public addRoom(room: RoomDto) {
    this.roomDataAccess.addRoom(room).pipe(
      tap(insertedRoom =>{
        if(insertedRoom && insertedRoom.id! > 0){
          const prevList = this.roomSubject$.value;
          this.roomSubject$.next([...prevList, insertedRoom])
          this.isAddedSubject$.next(true)
        }
        else{
          this.isAddedSubject$.next(false)
        }
      })
    ).subscribe();
  }
}
