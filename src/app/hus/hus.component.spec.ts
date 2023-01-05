import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusComponent } from './hus.component';

describe('HusComponent', () => {
  let component: HusComponent;
  let fixture: ComponentFixture<HusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
