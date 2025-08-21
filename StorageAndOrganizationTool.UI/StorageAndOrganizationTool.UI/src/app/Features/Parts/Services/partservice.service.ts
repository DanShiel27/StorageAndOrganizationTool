import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, take, tap } from 'rxjs';
import { PartDto } from '../../../Core/PartModels';
import { PartDataAccessService } from './part-data-access.service';



@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor() { }

  private partDataAccess = inject(PartDataAccessService)

  private partSubject$: BehaviorSubject<PartDto[]> = new BehaviorSubject<PartDto[]>([])
  private isAddedSubject$: BehaviorSubject<{name?: string, id?: number}> = new BehaviorSubject<{name?: string, id?: number}>({})

  public getPartListObservable(): Observable<PartDto[]> {
    return this.partSubject$.asObservable();
  }

  public getIsAddedObservable(): Observable<{name?: string, id?: number}>{
    return this.isAddedSubject$.asObservable();
  }

  public getParts(){
    this.partDataAccess.getParts().subscribe(parts=>{
      this.partSubject$.next(parts)
    })
  }

  public addPart(part: PartDto){
    this.partDataAccess.addPart(part).pipe(
      tap(InsertedPart=>{
        if(InsertedPart && InsertedPart.id! > 0){
          const prev = this.partSubject$.value;
          this.partSubject$.next([...prev, InsertedPart])
          this.isAddedSubject$.next({name: InsertedPart.name, id: InsertedPart.id})
        }
      })
    ).subscribe()
  }

  // return false if something went wrong, true if everything worked
  public editPart(partToEdit: PartDto): Observable<boolean>{
    //make sure we need to actually change it
    const unEditedPart: PartDto | undefined = this.partSubject$.value.find(arrayPart=>arrayPart.id === partToEdit.id)

    if(!unEditedPart || this.isEqual(unEditedPart!, partToEdit)){
      return of(false)
    }

    return this.partDataAccess.editPart(partToEdit).pipe(
      map(result=>{
        if(!result){
          let prev = this.partSubject$.value;
          let updated = prev.map(part => (part.id === partToEdit.id ? partToEdit : part));//TODO: this is comedically inefficient
          this.partSubject$.next(updated)//but this does cause a rerender
          return true
        }
        return false
      })
    )
  }

  public deletePart(partId: number): void{
    this.partDataAccess.deletePart(partId).pipe(
      tap(thing=>{
        let prev = this.partSubject$.value;
        let results = prev.filter(part=>{
          return part.id !== partId
        })
        this.partSubject$.next(results)
      })
    ).subscribe()
  }

  //messy but leaving for now
  public isEqual(part1: PartDto, part2: PartDto): boolean{
    return part1.name === part2.name &&
        part1.description === part2.description &&
        part1.length === part2.length &&
        part1.width === part2.width &&
        part1.height === part2.height &&
        part1.manufacturerId === part2.manufacturerId &&
        part1.rebrickableId === part2.rebrickableId &&
        part1.bricklinkId === part2.bricklinkId &&
        part1.id === part2.id;
  }
}
