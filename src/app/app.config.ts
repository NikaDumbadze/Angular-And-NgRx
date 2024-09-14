import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideExperimentalZonelessChangeDetection(),
    provideRouter(APP_ROUTES),
  ],
};
