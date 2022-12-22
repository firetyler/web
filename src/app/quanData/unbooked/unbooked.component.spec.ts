import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbookedComponent } from './unbooked.component';

describe('UnbookedComponent', () => {
  let component: UnbookedComponent;
  let fixture: ComponentFixture<UnbookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbookedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
