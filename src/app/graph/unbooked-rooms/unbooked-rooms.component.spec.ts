import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbookedRoomsComponent } from './unbooked-rooms.component';

describe('UnbookedRoomsComponent', () => {
  let component: UnbookedRoomsComponent;
  let fixture: ComponentFixture<UnbookedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbookedRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbookedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
