import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StudentcrudComponent}from './studentcrud/studentcrud.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [StudentcrudComponent],
  template:'<app-studentcrud></app-student-crud>',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'front-end';

}
