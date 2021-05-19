import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeatMapComponent} from './heat-map.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HeatMapComponent', () => {
  let component: HeatMapComponent;
  let fixture: ComponentFixture<HeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HeatMapComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
