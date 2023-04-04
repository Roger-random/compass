import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MagnetometerService {
  public state = new BehaviorSubject<MagnetometerServiceState>(MagnetometerServiceState.start);
  public status = new BehaviorSubject<string>("Uninitialized");
  public data = new Subject<MagnetometerData>();
  private _mag? : Magnetometer = undefined;

  constructor() {
    if ('undefined' !== typeof(Magnetometer)) {
      try {
        this._mag = new Magnetometer({frequency:10, referenceFrame:'screen'});
        this._mag.onreading = () => {this.onReading();};
        this._mag.onerror = (e) => {this.onError(e)};
        this._mag.start();
        this.state.next(MagnetometerServiceState.have_api);
        this.status.next("Created and started Magnetometer object");
      } catch (e) {
        this.state.next(MagnetometerServiceState.error);
        this.status.next('Magnetometer is defined yet creation failed.');
        if (e && typeof(e) === 'object' && 'message' in e) {
          this.status.next(`Magnetometer creation failure: ${e.message}`);
        }
      }
    } else {
      setTimeout(()=>{this.startPlaceholder()}, 100);
    }
  }

  onReading() : void {
    this.state.next(MagnetometerServiceState.have_sensor);
    this.status.next(`Magnetometer data received`);
    if (this._mag && this._mag.x && this._mag.y && this._mag.z){
      this.data.next({x:this._mag.x, y:this._mag.y, z:this._mag.z});
    }
  }

  onError(e:SensorErrorEvent) : void {
    if ("Could not connect to a sensor" !== e.error.message) {
      this.status.next(`onError: ${e.error.message}`);
      this.state.next(MagnetometerServiceState.error);
    } else {
      this.status.next(`Error "${e.error.message}" expected in absence of hardware magnetometer.`);
      setTimeout(()=>{this.startPlaceholder()}, 100);
    }
  }

  startPlaceholder() : void {
    const placeholderTimer = interval(100);

    this.status.next("No sensor, using placeholder data.");

    placeholderTimer.subscribe({
      next:(i) => this.data.next(MagnetometerService.placeholderData(i)),
    })
  }

  static placeholderData(counter: number) : MagnetometerData {
    const fullPeriod = 100; // Number of intervals for full cycle
    const periodFraction = (counter%fullPeriod)/fullPeriod; // Fraction of full cycle
    const periodRadians = periodFraction * 2 * Math.PI; // Fraction in radians

    return {x:Math.cos(periodRadians)*30, y:100, z:Math.sin(periodRadians)*50};
  }
}

export enum MagnetometerServiceState {
  error = 1,
  start,
  have_api,
  have_sensor,
}

export class MagnetometerData {
  constructor(public x:number, public y:number, public z:number) {}
}
