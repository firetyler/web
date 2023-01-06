import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationsComponent } from './calculations.component';

describe('CalculationsComponent', () => {
  let component: CalculationsComponent;
  let fixture: ComponentFixture<CalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
