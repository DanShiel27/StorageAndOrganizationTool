import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RoomDto } from '../../../Core/Models';

@Injectable({
  providedIn: 'root'
})
export class RoomDataAccessService {

  constructor() { }
  private http = inject(HttpClient)
  private apiurl = environment.apiURL + '/api/Room';

  public getRooms(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(this.apiurl);
  }

  public getRoom(id: number): Observable<RoomDto> {
    return this.http.get<RoomDto>(this.apiurl + `/${id}`);
  }

  public addRoom(room: RoomDto): Observable<RoomDto> {
    return this.http.post<RoomDto>(this.apiurl, room)
  }

  public editRoom(room: RoomDto): Observable<RoomDto> {
    return this.http.put<RoomDto>(this.apiurl + `/${room.id}`, room)
  }
}
