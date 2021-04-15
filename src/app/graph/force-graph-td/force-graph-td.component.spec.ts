import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceGraphTDComponent } from './force-graph-td.component';

describe('ForceGraphTDComponent', () => {
  let component: ForceGraphTDComponent;
  let fixture: ComponentFixture<ForceGraphTDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceGraphTDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceGraphTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
