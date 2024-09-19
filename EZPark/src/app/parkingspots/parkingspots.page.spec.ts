import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingspotsPage } from './parkingspots.page';

describe('ParkingspotsPage', () => {
  let component: ParkingspotsPage;
  let fixture: ComponentFixture<ParkingspotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingspotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
