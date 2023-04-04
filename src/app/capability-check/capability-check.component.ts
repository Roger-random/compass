import { Component } from '@angular/core';
import { CompassNeedleComponent } from '../compass-needle/compass-needle.component';
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

  constructor(protected magetometerService:MagnetometerService) {
    magetometerService.state.subscribe({
      next: (state) => {this.lastMagState = state;console.log(`magUpdate ${state}`);}
    });
    magetometerService.data.subscribe({
      next: (data) => {this.magX = data.x;this.magY = data.y;this.magZ = data.z;}
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
