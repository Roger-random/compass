import { Component, computed, Signal } from '@angular/core';
import { MagnetometerService, MagnetometerServiceState } from '../magnetometer.service';
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

export class CapabilityCheckComponent {
  constructor(
    protected magnetometerService:MagnetometerService,
    protected fullscreenService:FullscreenService) {
  }

  protected haveAPI : Signal<boolean> = computed(() =>
    this.magnetometerService.state() == MagnetometerServiceState.have_api)

  protected start : Signal<boolean> = computed(() =>
    this.magnetometerService.state() == MagnetometerServiceState.start)
}
