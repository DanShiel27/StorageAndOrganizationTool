import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../Services/roomservice.service';
import { RoomDto } from '../../../Core/Models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatRadioModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {

  private formBuilder = inject(FormBuilder);
  private roomService = inject(RoomService);
  private destroyRef = inject(DestroyRef)

  pictureList: number[] = [1, 2, 3]//TODO: going to move this somewhere else soon, Models.ts maybe?

  picture1Selected = signal('selected');
  picture2Selected = signal('');
  picture3Selected = signal('');

  roomForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    pictureNumber: [1]
  })

  isAdded$ = this.roomService.getIsAddedObservable().pipe(
    takeUntilDestroyed(this.destroyRef),
    skip(1),
    tap(result =>{
      this.handleSubmit(result);
    })
  ).subscribe();


  addRoom() {
    if(this.roomForm.invalid){
      return false;
    }

    let room: RoomDto = {
      id: 0,
      name: this.roomForm.value.name!,
      description: this.roomForm.value.description!,
      pictureNumber: this.roomForm.value.pictureNumber ?? 1
    }

    console.log(room)
    //this.roomService.addRoom(room);
    return true;
  }

  radioChanged($event: MatRadioChange) {
    //https://v17.angular.io/guide/class-binding
    if($event.value === 1){
      this.picture1Selected.set('selected');
      this.picture2Selected.set('');
      this.picture3Selected.set('');
    }
    else if($event.value === 2){
      this.picture1Selected.set('');
      this.picture2Selected.set('selected');
      this.picture3Selected.set('');
    }
    else if($event.value === 3){
      this.picture1Selected.set('');
      this.picture2Selected.set('');
      this.picture3Selected.set('selected');
    }
  }

  handleSubmit(result: boolean){
    //console.log(result)
  }
}
