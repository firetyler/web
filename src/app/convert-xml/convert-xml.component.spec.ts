import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertXMLComponent } from './convert-xml.component';

describe('ConvertXMLComponent', () => {
  let component: ConvertXMLComponent;
  let fixture: ComponentFixture<ConvertXMLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertXMLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertXMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
