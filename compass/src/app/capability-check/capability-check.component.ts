import { Component, OnInit } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

@Component({
  selector: 'app-capability-check',
  templateUrl: './capability-check.component.html',
  styleUrls: ['./capability-check.component.css']
})

export class CapabilityCheckComponent implements OnInit {
  scene = new Scene();
  camera = new PerspectiveCamera(75, 1.0, 0.1, 1000);
  renderer = new WebGLRenderer();
  cube = new Mesh();

  ngOnInit() : void {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

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
