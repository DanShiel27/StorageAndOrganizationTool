import { Component, DestroyRef, inject, OnInit} from '@angular/core';
import { PartService } from '../Services/partservice.service';
import { PartDto } from '../../../Core/PartModels';
import { map, take } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EditPartComponent } from '../edit-part/edit-part.component';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [MatSlideToggleModule, MatTableModule, MatButtonModule],
  templateUrl: './part-list.component.html',
  styleUrl: './part-list.component.scss'
})
export class PartListComponent implements OnInit {
  partService = inject(PartService)
  private destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog)

  displayedColumns: string[] = ["id", "name", "description", "length", "width", "height", "manufacturerId", "rebrickableId", "bricklinkId", "edit", "delete"]

  dataSource = new MatTableDataSource<PartDto>([]);

  dataSource$ = this.partService.getPartListObservable().pipe(
    takeUntilDestroyed(this.destroyRef),
    map(list =>{
      this.dataSource.data = list
    })
  ).subscribe()

  
  getPart(){
    this.partService.getParts();
  }

  deletePart(partToDelete: PartDto){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {part: partToDelete},
      height: '35%',
      width: '35%',
      maxHeight: '35vw',
      maxWidth: '35vw'
    })

    dialogRef.afterClosed().pipe(
      take(1),
      map(result =>{
        //number or undefined, not sure why I can't give result a type
        if(result){
          this.partService.deletePart(result);
        }
      })
    ).subscribe()
  }

  editPart(partToEdit: PartDto){
    const dialogRef = this.dialog.open(EditPartComponent, {
      data: {part: partToEdit},
      height: '70%',
      width: '70%',
      maxHeight: '50vw',
      maxWidth: '50vw'
    })
  }

  constructor(){}

  ngOnInit(): void {
    this.partService.getParts();
  }

  
}