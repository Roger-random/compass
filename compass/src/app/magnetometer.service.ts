import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MagnetometerService {
  _haveSensor : boolean = false;
  _mag? : Magnetometer = undefined;

  constructor() {
    if ('undefined' !== typeof(Magnetometer)) {
      try {
        this._mag = new Magnetometer({frequency:10, referenceFrame:'screen'});
        this._mag.onreading = this.onReading;
        this._mag.onerror = this.onError;
        this._mag.start();
        console.log("Mag started");
      } catch (e) {
        console.log('Magnetometer is defined yet creation failed.');
        if (e && typeof(e) === 'object' && 'message' in e) {
          console.log(`Magnetometer creation failure: ${e.message}`)
        }
      }
    }
  }

  onReading() : void {
    this._haveSensor = true;
    console.log(`onReading! X ${this._mag?.x}`);
  }

  onError(e:SensorErrorEvent) : void {
    console.log(`onError: ${e.error.message}`);
  }

  public get haveAPI() : boolean {
    if (undefined === this._mag) {
      return false;
    }
    return true;
  }

  public get haveSensor() : boolean {
    return this._haveSensor;
  }
}
