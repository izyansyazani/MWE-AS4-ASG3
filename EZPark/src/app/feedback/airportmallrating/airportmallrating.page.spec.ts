import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirportmallratingPage } from './airportmallrating.page';

describe('AirportmallratingPage', () => {
  let component: AirportmallratingPage;
  let fixture: ComponentFixture<AirportmallratingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportmallratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
