import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Scene, Group, PerspectiveCamera, WebGLRenderer, Mesh, ConeGeometry, MeshBasicMaterial, Vector2 } from 'three';

@Component({
  selector: 'app-compass-needle',
  templateUrl: './compass-needle.component.html',
  styleUrls: ['./compass-needle.component.css']
})

export class CompassNeedleComponent implements AfterViewInit {
  scene = new Scene();
  camera = new PerspectiveCamera(75, 1.0, 0.1, 1000);
  renderer = new WebGLRenderer();
  needle = new Group();

  @ViewChild('compassneedlediv') chilDiv!: ElementRef;

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

    requestAnimationFrame((timestamp)=>{
      CompassNeedleComponent.animationFrameCallback(this, timestamp)
    });
  }

  resize() : HTMLDivElement {
    let dive: HTMLDivElement = this.chilDiv.nativeElement;

    this.camera.aspect = dive.clientWidth / dive.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( dive.clientWidth, dive.clientHeight );

    return dive;
  }

  checksize() : void {
    let dive: HTMLDivElement = this.chilDiv.nativeElement;
    let renderSize: Vector2 = new Vector2(0,0);

    this.renderer.getSize(renderSize);

    if (renderSize.x != dive.clientWidth ||
        renderSize.y != dive.clientHeight) {
        this.resize();
    }
  }

  static animationFrameCallback(context : CompassNeedleComponent, timestamp: DOMHighResTimeStamp) : void {
    context.needle.rotation.x += 0.01;
    context.needle.rotation.y += 0.01;

    context.checksize();
    context.renderer.render( context.scene, context.camera );

    requestAnimationFrame((timestamp)=>{
      CompassNeedleComponent.animationFrameCallback(context, timestamp)
    });
  }
}
