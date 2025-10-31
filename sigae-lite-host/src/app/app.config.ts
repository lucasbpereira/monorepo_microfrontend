import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import SigaeLitePreset from './sigae-lite-preset';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptorsFromDi(),
      withFetch()),
    provideRouter(routes), 
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: {
        preset: SigaeLitePreset,
        options: { 
          darkModeSelector: false,
          prefix: 'sigae-lite'
        }
      }
    })
  ]
};
