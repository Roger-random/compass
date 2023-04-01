import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

@Component({
  selector: 'app-capability-check',
  templateUrl: './capability-check.component.html',
  styleUrls: ['./capability-check.component.css']
})

export class CapabilityCheckComponent implements AfterViewInit {
  scene = new Scene();
  camera = new PerspectiveCamera(75, 1.0, 0.1, 1000);
  renderer = new WebGLRenderer();
  cube = new Mesh();

  @ViewChild('mydiv') chilDiv!: ElementRef;

  ngAfterViewInit() : void {
    let dive: HTMLDivElement = this.chilDiv.nativeElement;

    this.camera.aspect = dive.clientWidth / dive.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( dive.clientWidth, dive.clientHeight );
    dive.appendChild( this.renderer.domElement );

    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;

    requestAnimationFrame((timestamp)=>{
      CapabilityCheckComponent.animationFrameCallback(this, timestamp)
    });
  }

  static animationFrameCallback(context : CapabilityCheckComponent, timestamp: DOMHighResTimeStamp) : void {
    context.cube.rotation.x += 0.01;
    context.cube.rotation.y += 0.01;

    context.renderer.render( context.scene, context.camera );

    requestAnimationFrame((timestamp)=>{
      CapabilityCheckComponent.animationFrameCallback(context, timestamp)
    });
  }
}
