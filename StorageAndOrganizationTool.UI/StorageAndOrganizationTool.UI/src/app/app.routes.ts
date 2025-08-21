import { Routes } from '@angular/router';
import { HomeComponent } from './Features/Home/home/home.component';
import { PartManagerComponent } from './Features/Parts/part-manager/part-manager.component';

export const routes: Routes = [
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
