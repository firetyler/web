import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFiltersComponent } from './time-filters.component';

describe('TimeFiltersComponent', () => {
  let component: TimeFiltersComponent;
  let fixture: ComponentFixture<TimeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
