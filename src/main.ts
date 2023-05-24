import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }))]
})
  .catch(err => console.error(err));
