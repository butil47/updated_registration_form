import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient,withFetch,withInterceptors} from '@angular/common/http';

import { APP_ROUTES } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { fakeapiinterceptorInterceptor } from './interceptors/fakeapiinterceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([fakeapiinterceptorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(APP_ROUTES), 
     provideClientHydration(withEventReplay()),
     provideAnimationsAsync(),
     providePrimeNG({
       theme: {
         preset: Aura
       }
     }),
     provideHttpClient(
      withInterceptors([fakeapiinterceptorInterceptor])
    )]
};
