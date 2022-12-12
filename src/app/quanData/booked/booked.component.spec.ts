import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedComponent } from './booked.component';

describe('BookedComponent', () => {
  let component: BookedComponent;
  let fixture: ComponentFixture<BookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
