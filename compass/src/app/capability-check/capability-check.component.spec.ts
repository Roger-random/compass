import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityCheckComponent } from './capability-check.component';

describe('CapabilityCheckComponent', () => {
  let component: CapabilityCheckComponent;
  let fixture: ComponentFixture<CapabilityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilityCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapabilityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
