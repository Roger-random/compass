import { Component, ChangeDetectorRef } from '@angular/core';
import { MagnetometerService, MagnetometerServiceState } from '../magnetometer.service';

@Component({
  selector: 'app-capability-check',
  templateUrl: './capability-check.component.html',
  styleUrls: ['./capability-check.component.css']
})

export class CapabilityCheckComponent {
  protected lastMagState : MagnetometerServiceState = MagnetometerServiceState.error;

  protected magX : number = 0;
  protected magY : number = 0;
  protected magZ : number = 0;

  constructor(protected magetometerService:MagnetometerService, private cdRef : ChangeDetectorRef) {
    magetometerService.state.subscribe({
      next: (state) => {this.lastMagState = state;this.cdRef.detectChanges();}
    });
    magetometerService.data.subscribe({
      next: (data) => {this.magX = data.x;this.magY = data.y;this.magZ = data.z;this.cdRef.detectChanges();}
    });

  }

  protected haveSensor() : boolean {
    return this.lastMagState == MagnetometerServiceState.have_sensor;
  }

  protected haveAPI() : boolean {
    return this.lastMagState == MagnetometerServiceState.have_api;
  }

  protected start() : boolean {
    return this.lastMagState == MagnetometerServiceState.start;
  }

  protected error() : boolean {
    return this.lastMagState == MagnetometerServiceState.error;
  }
}
