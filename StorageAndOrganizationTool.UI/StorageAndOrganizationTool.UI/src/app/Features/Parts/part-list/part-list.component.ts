import { Component, DestroyRef, inject, OnInit, ViewChild, viewChild} from '@angular/core';
import { PartService } from '../Services/partservice.service';
import { PartDto } from '../../../Core/PartModels';
import { map, take } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EditPartComponent } from '../edit-part/edit-part.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatIconModule, MatPaginatorModule],
  templateUrl: './part-list.component.html',
  styleUrl: './part-list.component.scss'
})
export class PartListComponent implements OnInit {
  partService = inject(PartService)
  private destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog)

  displayedColumns: string[] = ["id", "name", "description", "length", "width", "height", "manufacturerId", "rebrickableId", "bricklinkId", "edit", "delete"]

  dataSource = new MatTableDataSource<PartDto>([]);

  filterString: string = '';

  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource$ = this.partService.getPartListObservable().pipe(
    takeUntilDestroyed(this.destroyRef),
    map(list =>{
      this.dataSource.data = list
    })
  ).subscribe()

  filterInputHandler($event: KeyboardEvent) {
    if($event.key === "Enter"){
      this.filter();
    }
  }

  clearFilter() {
    this.filterString = '';
    this.filter();
  }

  filter() {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
  
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
}