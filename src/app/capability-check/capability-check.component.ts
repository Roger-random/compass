import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MagnetometerService, MagnetometerServiceState } from '../magnetometer.service';
import { distinct } from 'rxjs';

@Component({
  selector: 'app-capability-check',
  templateUrl: './capability-check.component.html',
  styleUrls: ['./capability-check.component.css']
})

export class CapabilityCheckComponent implements OnInit {
  protected lastMagState : MagnetometerServiceState = MagnetometerServiceState.error;

  protected magX : number = 0;
  protected magY : number = 0;
  protected magZ : number = 0;

  constructor(protected magnetometerService:MagnetometerService, private cdRef : ChangeDetectorRef) {}

  ngOnInit():void {
    this.magnetometerService.state
      .pipe(distinct())
      .subscribe({
        next: (state) => {
          this.lastMagState = state;
          this.cdRef.detectChanges();
        }
      });
    this.magnetometerService.data.subscribe({
      next: (data) => {
        this.magX = data.x;
        this.magY = data.y;
        this.magZ = data.z;
        this.cdRef.detectChanges();
      }
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
