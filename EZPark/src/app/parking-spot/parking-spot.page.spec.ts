import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingSpotPage } from './parking-spot.page';

describe('ParkingSpotPage', () => {
  let component: ParkingSpotPage;
  let fixture: ComponentFixture<ParkingSpotPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSpotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
