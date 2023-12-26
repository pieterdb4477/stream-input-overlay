import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerButtonComponent } from './visualizer-button.component';

describe('VisualizerButtonComponent', () => {
  let component: VisualizerButtonComponent;
  let fixture: ComponentFixture<VisualizerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizerButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
