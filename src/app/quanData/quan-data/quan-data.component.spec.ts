import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanDataComponent } from './quan-data.component';

describe('QuanDataComponent', () => {
  let component: QuanDataComponent;
  let fixture: ComponentFixture<QuanDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
