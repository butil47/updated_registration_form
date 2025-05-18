import { NgModule } from '@angular/core'; // Core Angular module
import { BrowserModule } from '@angular/platform-browser'; // Browser support for Angular apps
import { FormsModule } from '@angular/forms'; 
import{ServerModule} from '@angular/platform-server';
import{CommonModule} from '@angular/common';
import { HomeModule } from './home/home.module';
import{HomeComponent} from './home/home.component';
import{ ReactiveFormsModule} from '@angular/forms';
import{APP_ROUTES} from './app.routes';
import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import {PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import{ StudentcrudComponent} from './studentcrud/studentcrud.component';
import {provideHttpClient,withFetch} from '@angular/common/http';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { StudentTableComponent } from './student-table/student-table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  
  imports: [
    BrowserModule,  
    RouterModule,
    FormsModule,
    HomeModule,
    HomeComponent,
    StudentTableComponent ,
    StudentcrudComponent,
    PagenotfoundComponent,
    ReactiveFormsModule,
  
    CommonModule,
    ServerModule,
    SelectModule,
    InputGroupModule,
    AppRoutes,

    
  ], 
  providers:[
    provideHttpClient(withFetch()),
  ],
  
  
})
export class AppModule {}
export class AppServerModule{}

