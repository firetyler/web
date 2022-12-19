import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceGraphComponent } from './price-graph.component';

describe('PriceGraphComponent', () => {
  let component: PriceGraphComponent;
  let fixture: ComponentFixture<PriceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
