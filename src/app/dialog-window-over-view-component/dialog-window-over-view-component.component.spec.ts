import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWindowOverViewComponentComponent } from './dialog-window-over-view-component.component';

describe('DialogWindowOverViewComponentComponent', () => {
  let component: DialogWindowOverViewComponentComponent;
  let fixture: ComponentFixture<DialogWindowOverViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWindowOverViewComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWindowOverViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
