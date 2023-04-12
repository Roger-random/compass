import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {
  public fullscreenNotification = new BehaviorSubject<boolean>(false);

  document = new Document();

  constructor() { }

  canFullscreen() : boolean {
    return document.fullscreenElement == null && document.fullscreenEnabled;
  }

  goFullscreen() : void {
    this.fullscreenNotification.next(true);
  }
}
