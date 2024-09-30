import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects'

import { productsReducer } from './features/products/state/products.reducer';
import { environment } from 'src/environments/environment.prod';
import { ProductEffects } from './features/products/state/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
      StoreModule.forRoot({}),
      StoreModule.forFeature('products', productsReducer),
      StoreDevtoolsModule.instrument({
        name: 'NgRx Demo App',
        maxAge: 25,
        logOnly: environment.production
      }),
      EffectsModule.forRoot([]),
      EffectsModule.forFeature([ProductEffects])
    ),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(APP_ROUTES),
  ],
};
