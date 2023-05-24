import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassNeedleComponent } from './compass-needle.component';

describe('CompassNeedleComponent', () => {
  let component: CompassNeedleComponent;
  let fixture: ComponentFixture<CompassNeedleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CompassNeedleComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CompassNeedleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
