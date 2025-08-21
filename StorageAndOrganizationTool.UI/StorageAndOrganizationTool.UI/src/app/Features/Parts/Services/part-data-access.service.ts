import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';
import { PartDto } from '../../../Core/PartModels';

@Injectable({
  providedIn: 'root'
})
export class PartDataAccessService {

  constructor() { }
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/api/Parts';

  public getParts(): Observable<PartDto[]> {
    return this.http.get<PartDto[]>(this.apiUrl)
  }

  public addPart(part: PartDto): Observable<PartDto>{
    return this.http.post<PartDto>(this.apiUrl, part)
  }

  public editPart(part: PartDto){
    return this.http.put(this.apiUrl + `/${part.id}`, part).pipe(
      catchError(_val=>{
        return of(false);
      })
    )
  }

  public deletePart(partId: number){
    return this.http.delete(this.apiUrl + `/${partId}`);
  }
}
