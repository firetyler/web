import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoterComponent } from './foter.component';

describe('FoterComponent', () => {
  let component: FoterComponent;
  let fixture: ComponentFixture<FoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
