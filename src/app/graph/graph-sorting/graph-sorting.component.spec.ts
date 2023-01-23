import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSortingComponent } from './graph-sorting.component';

describe('GraphSortingComponent', () => {
  let component: GraphSortingComponent;
  let fixture: ComponentFixture<GraphSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSortingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
