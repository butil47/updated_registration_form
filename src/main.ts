import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import {  APP_ROUTES} from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import{provideHttpClient, withInterceptors } from '@angular/common/http';
import{fakeapiinterceptorInterceptor} from './app/interceptors/fakeapiinterceptor.interceptor'
bootstrapApplication(AppComponent,appConfig)
bootstrapApplication(AppComponent,{providers: [provideHttpClient
  (withInterceptors([fakeapiinterceptorInterceptor])), provideRouter( APP_ROUTES),provideAnimations()]})
  .catch((err) => console.error(err));
