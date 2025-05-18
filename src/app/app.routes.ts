import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import{ StudentcrudComponent} from './studentcrud/studentcrud.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { LandingpageComponent } from './landingpage/landingpage.component';


export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }, // Default route
      { path: 'studentcrud', component: StudentcrudComponent },
      { path: 'students', component: StudentTableComponent },
    
      
];
export const AppRoutes = RouterModule.forRoot( APP_ROUTES);
// export const APP_ROUTES: Routes = [
//     { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
//       { path: 'landingpage', component: LandingpageComponent },
//       { path: 'home', component: HomeComponent }, // Default route
//       { path: 'studentcrud', component: StudentcrudComponent },
//       { path: 'students', component: StudentTableComponent },
//       { path: 'login', component: StudentTableComponent },
      
// ];