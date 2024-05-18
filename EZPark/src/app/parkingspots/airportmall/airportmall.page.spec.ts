import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirportmallPage } from './airportmall.page';

describe('AirportmallPage', () => {
  let component: AirportmallPage;
  let fixture: ComponentFixture<AirportmallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportmallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
