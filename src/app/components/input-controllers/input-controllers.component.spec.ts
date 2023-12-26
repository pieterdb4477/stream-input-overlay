import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControllersComponent } from './input-controllers.component';

describe('InputControllersComponent', () => {
  let component: InputControllersComponent;
  let fixture: ComponentFixture<InputControllersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputControllersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
