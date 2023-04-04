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

  constructor(protected magetometerService:MagnetometerService) {
    magetometerService.state.subscribe({
      next: (state) => {this.lastMagState = state;console.log(`magUpdate ${state}`);}
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
