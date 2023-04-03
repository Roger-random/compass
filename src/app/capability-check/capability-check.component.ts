import { Component } from '@angular/core';
import { CompassNeedleComponent } from '../compass-needle/compass-needle.component';
import { MagnetometerService } from '../magnetometer.service';

@Component({
  selector: 'app-capability-check',
  templateUrl: './capability-check.component.html',
  styleUrls: ['./capability-check.component.css']
})

export class CapabilityCheckComponent {
  constructor(private magetometerService:MagnetometerService) {

  }

  public get haveMagnetometerAPI() : boolean {
    return this.magetometerService.haveAPI;
  }

  public get haveMagnetometerSensor() : boolean {
    return this.magetometerService.haveSensor;
  }
}
