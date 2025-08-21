import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartDto } from '../../../Core/PartModels';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PartService } from '../Services/partservice.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-edit-part',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-part.component.html',
  styleUrl: './edit-part.component.scss'
})
export class EditPartComponent {
  private formBuilder = inject(FormBuilder);
  private partService = inject(PartService);

  readonly dialogRef = inject(MatDialogRef<EditPartComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly part: PartDto = this.data.part;

  partForm = this.formBuilder.group({
    name: [this.part.name, Validators.required],
    description: [this.part.description, Validators.required],
    length: [this.part.length, Validators.required],
    width: [this.part.width, Validators.required],
    height: [this.part.height, Validators.required],
    manufacturerId: [this.part.manufacturerId, Validators.required],
    rebrickableId: [this.part.rebrickableId, Validators.required],
    bricklinkId: [this.part.bricklinkId, Validators.required]
  })

  EditPart(){
    if(this.partForm.invalid){
      console.log("form invalid")
      return false;
    }
    let Dto: PartDto = {
      id: this.part.id,
      name: this.partForm.value.name!,
      description: this.partForm.value.description!,
      length: this.partForm.value.length!,
      width: this.partForm.value.width!,
      height: this.partForm.value.height!,
      manufacturerId: this.partForm.value.manufacturerId!,
      rebrickableId: this.partForm.value.rebrickableId!,
      bricklinkId: this.partForm.value.bricklinkId!
    }

    //don't actually need take 1 here but keeping for readability
    this.partService.editPart(Dto).pipe(take(1)).subscribe(result =>{
      if(result){
        this.closeDialog();
      }
    })
    return true;
  }

  closeDialog(){
    this.dialogRef.close()
  }


}
