import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../Services/roomservice.service';
import { RoomDto } from '../../../Core/Models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelect, MatSelectModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {
  private formBuilder = inject(FormBuilder);
  private roomService = inject(RoomService);
  private destroyRef = inject(DestroyRef)

  pictureList: number[] = [0, 1, 2]//TODO: going to move this somewhere else soon, Models.ts maybe?

  roomForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    pictureNumber: [0]
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
      pictureNumber: this.roomForm.value.pictureNumber ?? 0
    }

    this.roomService.addRoom(room);
    return true;
  }

  handleSubmit(result: boolean){
    
  }
}
