import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'compass';
  document = new Document();

  @ViewChild('rootdiv') rootDiv!: ElementRef;

  fullscreen_possible() : boolean {
    return document.fullscreenElement == null && document.fullscreenEnabled;
  }

  toggleFullScreen() : void {
    console.log('toggle');
    if (!document.fullscreenElement) {
      this.rootDiv.nativeElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
