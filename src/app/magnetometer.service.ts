import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MagnetometerService {
  public x = signal(-100.00);
  public y = signal(-100.00);
  public z = signal(0.00);
  public state = new BehaviorSubject<MagnetometerServiceState>(MagnetometerServiceState.start);
  public status = signal("Uninitialized");
  private _mag? : Magnetometer = undefined;
  private _noReadYet : boolean = true;

  constructor() {
    if ('undefined' !== typeof(Magnetometer)) {
      try {
        this._mag = new Magnetometer({frequency:10, referenceFrame:'screen'});
        this._mag.onreading = () => {this.onReading();};
        this._mag.onerror = (e) => {this.onError(e)};
        this._mag.start();
        this.state.next(MagnetometerServiceState.have_api);
        this.status.set("Created and started Magnetometer object");
      } catch (e) {
        this.state.next(MagnetometerServiceState.error);
        this.status.set('Magnetometer is defined yet creation failed');
        if (e && typeof(e) === 'object' && 'message' in e) {
          this.status.set(`Magnetometer creation failure: ${e.message}`);
        }
      }
    } else {
      setTimeout(()=>{this.startPlaceholder()}, 100);
    }
  }

  onReading() : void {
    if (this._mag && this._mag.x && this._mag.y && this._mag.z){
      this.x.set(this._mag.x);
      this.y.set(this._mag.y);
      this.z.set(this._mag.z);
      if (this._noReadYet) {
        this.state.next(MagnetometerServiceState.have_sensor);
        this.status.set(`Receiving magnetometer data`);
        this._noReadYet = false;
      }
    }
  }

  onError(e:SensorErrorEvent) : void {
    if ("Could not connect to a sensor" !== e.error.message) {
      this.status.set(`onError: ${e.error.message}`);
      this.state.next(MagnetometerServiceState.error);
    } else {
      this.status.set(`Error "${e.error.message}" expected in absence of hardware magnetometer`);
      setTimeout(()=>{this.startPlaceholder()}, 100);
    }
  }

  startPlaceholder() : void {
    const placeholderTimer = interval(100);

    this.status.set("No sensor, using placeholder data");

    placeholderTimer.subscribe({
      next:(i) => {
        const fullPeriod = 100; // Number of intervals for full cycle
        const periodFraction = (i%fullPeriod)/fullPeriod; // Fraction of full cycle
        const periodRadians = periodFraction * 2 * Math.PI; // Fraction in radians

        this.x.set(Math.cos(periodRadians)*30);
        this.y.set(100);
        this.z.set(Math.sin(periodRadians)*50);
      },
    })
  }
}

export enum MagnetometerServiceState {
  error = 1,
  start,
  have_api,
  have_sensor,
}
