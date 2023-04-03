import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CapabilityCheckComponent } from './capability-check/capability-check.component';

const routes: Routes = [
  { path: '', redirectTo: '/capability-check', pathMatch: 'full' },
  { path: 'capability-check', component: CapabilityCheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
