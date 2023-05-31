import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MagnetometerService, MagnetometerServiceState } from '../magnetometer.service';
import { distinct } from 'rxjs';
import { FullscreenService } from '../fullscreen.service';
import { CompassNeedleComponent } from '../compass-needle/compass-needle.component';
import { NgIf, AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-capability-check',
    templateUrl: './capability-check.component.html',
    styleUrls: ['./capability-check.component.css'],
    standalone: true,
    imports: [NgIf, CompassNeedleComponent, AsyncPipe, DecimalPipe]
})

export class CapabilityCheckComponent implements OnInit {
  protected lastMagState : MagnetometerServiceState = MagnetometerServiceState.error;

  constructor(
    protected magnetometerService:MagnetometerService,
    protected fullscreenService:FullscreenService,
    private cdRef : ChangeDetectorRef) {
  }

  ngOnInit():void {
    this.magnetometerService.state
      .pipe(distinct())
      .subscribe({
        next: (state) => {
          this.lastMagState = state;
          this.cdRef.detectChanges();
        }
      });
  }

  protected haveAPI() : boolean {
    return this.lastMagState == MagnetometerServiceState.have_api;
  }

  protected start() : boolean {
    return this.lastMagState == MagnetometerServiceState.start;
  }
}
