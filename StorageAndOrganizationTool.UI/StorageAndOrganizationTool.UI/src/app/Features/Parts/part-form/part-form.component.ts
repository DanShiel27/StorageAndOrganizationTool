import { Component, DestroyRef, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { PartDto } from '../../../Core/PartModels';
import { PartService } from '../Services/partservice.service';
import { tap, skip, } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-part-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './part-form.component.html',
  styleUrl: './part-form.component.scss'
})
export class PartFormComponent {
  private formBuilder = inject(FormBuilder);
  private partService = inject(PartService);
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);

  isAdded$ = this.partService.getIsAddedObservable().pipe(
    takeUntilDestroyed(this.destroyRef),
    skip(1),//feels like a hack
    tap(newPart =>{
      this.handleAddedMessage(newPart);
      this.resetForm();
    })
  ).subscribe();


  partForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    length: [0, Validators.required],
    width: [0, Validators.required],
    height: [0, Validators.required],
    manufacturerId: [0, Validators.required],
    rebrickableId: [0, Validators.required],
    bricklinkId: [0, Validators.required]
  })

  addPart() {
    if(this.partForm.invalid){
      return false;
    }
    let Dto: PartDto = {
      id: 0,
      name: this.partForm.value.name!,
      description: this.partForm.value.description!,
      length: this.partForm.value.length!,
      width: this.partForm.value.width!,
      height: this.partForm.value.height!,
      manufacturerId: this.partForm.value.manufacturerId!,
      rebrickableId: this.partForm.value.rebrickableId!,
      bricklinkId: this.partForm.value.bricklinkId!
    }

    this.partService.addPart(Dto)
    return true
  }

  resetForm(){
    this.partForm.setValue({
      name: '',
      description: '',
      length: 0,
      width: 0,
      height: 0,
      manufacturerId: 0,
      rebrickableId: 0,
      bricklinkId: 0
    })
  }

  handleAddedMessage(messageStatus: {name?: string, id?: number}){
    const IsAddedMessage = (messageStatus.name && messageStatus.id) ? `Part added: Name: ${messageStatus.name}, Id: ${messageStatus.id}` : "Something went wrong";
    this.snackBar.open(IsAddedMessage, undefined ,{duration: 5000});
  }
}
