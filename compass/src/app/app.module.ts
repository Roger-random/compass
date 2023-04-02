import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapabilityCheckComponent } from './capability-check/capability-check.component';
import { CompassNeedleComponent } from './compass-needle/compass-needle.component';

@NgModule({
  declarations: [
    AppComponent,
    CapabilityCheckComponent,
    CompassNeedleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
