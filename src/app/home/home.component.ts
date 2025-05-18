import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MyService } from '../services/my.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-home',
  imports: [ InputTextModule, PasswordModule, ButtonModule,InputIconModule,IconFieldModule,RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true
})

export class HomeComponent {
  constructor(private router: Router, private myService: MyService) {}

}



