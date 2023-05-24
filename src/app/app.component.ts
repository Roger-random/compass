import { Component, ElementRef, ViewChild } from '@angular/core';
import { FullscreenService } from './fullscreen.service';
import { CapabilityCheckComponent } from './capability-check/capability-check.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CapabilityCheckComponent]
})
export class AppComponent {
  title = 'compass';
  document = new Document();

  @ViewChild('rootdiv') rootDiv!: ElementRef;

  constructor(private fullscreenService:FullscreenService) {
    fullscreenService.fullscreenNotification.subscribe({
        next: (newState) => {
          if (newState && !document.fullscreenElement) {
            this.rootDiv.nativeElement.requestFullscreen();
          }
        }
      });
  }
}
