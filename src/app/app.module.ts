import { NgModule } from '@angular/core'; // Core Angular module
import { BrowserModule } from '@angular/platform-browser'; // Browser support for Angular apps
import { FormsModule } from '@angular/forms'; 
import{ServerModule} from '@angular/platform-server';
import{CommonModule} from '@angular/common';

import{ ReactiveFormsModule} from '@angular/forms';
import{AppComponent} from './app.component';
import{ StudentcrudComponent} from './studentcrud/studentcrud.component';
import {provideHttpClient,withFetch} from '@angular/common/http';
@NgModule({
  
  imports: [
    BrowserModule,  
    FormsModule,
    ReactiveFormsModule,
    AppComponent,
    CommonModule,
    ServerModule,
    StudentcrudComponent ,
  ], 
  providers:[
    provideHttpClient(withFetch()),
  ],
})
export class AppModule {}
export class AppServerModule{}

