import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkademiComponent } from './akademi.component';

describe('AkademiComponent', () => {
  let component: AkademiComponent;
  let fixture: ComponentFixture<AkademiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkademiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkademiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
