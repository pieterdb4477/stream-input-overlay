import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControllerDetailComponent } from './input-controller-detail.component';

describe('InputControllerDetailComponent', () => {
  let component: InputControllerDetailComponent;
  let fixture: ComponentFixture<InputControllerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputControllerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputControllerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
