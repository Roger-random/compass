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
    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;

    this.animate();
  }

  animate() : void {
    requestAnimationFrame( this.animate );

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );
  }
}
