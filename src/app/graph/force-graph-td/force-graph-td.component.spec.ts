import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceGraphTDComponent } from './force-graph-td.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ForceGraphTDComponent', () => {
  let component: ForceGraphTDComponent;
  let fixture: ComponentFixture<ForceGraphTDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
