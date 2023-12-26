import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerDirectionalPadComponent } from './visualizer-directional-pad.component';

describe('VisualizerDirectionalPadComponent', () => {
  let component: VisualizerDirectionalPadComponent;
  let fixture: ComponentFixture<VisualizerDirectionalPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizerDirectionalPadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizerDirectionalPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
