import { Routes } from '@angular/router';
import { HomeComponent } from './Features/Home/home/home.component';
import { PartManagerComponent } from './Features/Parts/part-manager/part-manager.component';
import { RoomManagerComponent } from './Features/Rooms/room-manager/room-manager.component';

export const routes: Routes = [
    {
        path: 'rooms',
        component: RoomManagerComponent
    },
    {
        path: 'parts',
        component: PartManagerComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
