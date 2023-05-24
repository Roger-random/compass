import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Scene, Group, PerspectiveCamera, WebGLRenderer, Mesh, ConeGeometry, MeshBasicMaterial, Vector2 } from 'three';
import { MagnetometerData, MagnetometerService } from '../magnetometer.service';

@Component({
    selector: 'app-compass-needle',
    templateUrl: './compass-needle.component.html',
    styleUrls: ['./compass-needle.component.css'],
    standalone: true
})

export class CompassNeedleComponent implements AfterViewInit {
  scene = new Scene();
  camera = new PerspectiveCamera(75, 1.0, 0.1, 1000);
  renderer = new WebGLRenderer();
  needle = new Group();

  @ViewChild('compassneedlediv') chilDiv!: ElementRef;

  constructor(private magnetometerService:MagnetometerService) {
    magnetometerService.data.subscribe({
      next: (value) => this.updateNeedle(value),
    });
  }

  ngAfterViewInit() : void {
    this.resize().appendChild( this.renderer.domElement );

    const redConeGeometry = new ConeGeometry( 1, 3, 16 );
    redConeGeometry.translate(0, 1.5, 0);
    redConeGeometry.rotateX(Math.PI/2);
    const redMaterial = new MeshBasicMaterial( { color: 0xff0000 } );
    const redCone = new Mesh( redConeGeometry, redMaterial );

    const whiteConeGeometry = new ConeGeometry( 1, 3, 16 );
    whiteConeGeometry.translate(0, 1.5, 0);
    whiteConeGeometry.rotateX(-Math.PI/2);
    const whiteMaterial = new MeshBasicMaterial( { color: 0xffffff });
    const whiteCone = new Mesh( whiteConeGeometry, whiteMaterial );

    this.needle.add(redCone);
    this.needle.add(whiteCone);

    this.scene.add( this.needle );

    this.camera.position.z = 7;
  }

  resize() : HTMLDivElement {
    let dive: HTMLDivElement = this.chilDiv.nativeElement;
    let squareSide = Math.floor(Math.min(dive.clientWidth, dive.clientHeight));

    this.renderer.setSize( squareSide, squareSide );

    return dive;
  }

  checksize() : void {
    let dive: HTMLDivElement = this.chilDiv.nativeElement;
    let renderSize: Vector2 = new Vector2(0,0);

    this.renderer.getSize(renderSize);

    if (renderSize.x != Math.floor(Math.min(dive.clientWidth, dive.clientHeight))) {
        this.resize();
    }
  }

  updateNeedle(value:MagnetometerData) : void {
    this.needle.lookAt(value.x, value.y, value.z);
    requestAnimationFrame((timestamp)=>this.renderNeedle(timestamp));
  }

  renderNeedle(timestamp: DOMHighResTimeStamp) : void {
    this.checksize();
    this.renderer.render( this.scene, this.camera );
  }
}
