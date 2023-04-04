import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MagnetometerService {
  public state = new BehaviorSubject<MagnetometerServiceState>(MagnetometerServiceState.start);
  public status = new BehaviorSubject<string>("Uninitialized");
  private _mag? : Magnetometer = undefined;

  constructor() {
    if ('undefined' !== typeof(Magnetometer)) {
      try {
        this._mag = new Magnetometer({frequency:10, referenceFrame:'screen'});
        this._mag.onreading = () => {MagnetometerService.onReading(this);};
        this._mag.onerror = (e) => {MagnetometerService.onError(this, e)};
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
    }
  }

  static onReading(context: MagnetometerService) : void {
    context.state.next(MagnetometerServiceState.have_sensor);
    context.status.next(`onReading! X ${context._mag?.x}`);
  }

  static onError(context: MagnetometerService, e:SensorErrorEvent) : void {
    if ("Could not connect to a sensor" !== e.error.message) {
      context.status.next(`onError: ${e.error.message}`);
      context.state.next(MagnetometerServiceState.error);
    } else {
      context.status.next(`Error "${e.error.message}" expected in absence of hardware magnetometer.`);
    }
  }
}

export enum MagnetometerServiceState {
  error = 1,
  start,
  have_api,
  have_sensor,
}
