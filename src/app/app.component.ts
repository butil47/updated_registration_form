import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import{HomeComponent} from './home/home.component';
import {StudentcrudComponent}from './studentcrud/studentcrud.component';

@Component({
  selector: 'app-root',
  standalone:true,
 imports:[RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'front-end';

  
}
