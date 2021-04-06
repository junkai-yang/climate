import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sum1Component } from './sum1.component';

describe('Sum1Component', () => {
  let component: Sum1Component;
  let fixture: ComponentFixture<Sum1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sum1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sum1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
