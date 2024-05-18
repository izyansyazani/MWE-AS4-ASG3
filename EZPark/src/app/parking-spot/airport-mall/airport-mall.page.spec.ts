import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirportMallPage } from './airport-mall.page';

describe('AirportMallPage', () => {
  let component: AirportMallPage;
  let fixture: ComponentFixture<AirportMallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportMallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
