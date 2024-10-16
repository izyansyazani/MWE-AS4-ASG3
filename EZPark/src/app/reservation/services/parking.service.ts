import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private initialSpots: { [key: string]: boolean } = {
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
    A7: false,
    A8: false,
    A9: false,
    A10: false,
    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,
    B7: false,
    B8: false,
    B9: false,
    B10: false,
    C1: false,
    C2: false,
    C3: false,
    C4: false,
    C5: false,
    C6: false,
    C7: false,
    C8: false,
    C9: false,
    C10: false,
    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
    D6: false,
    D7: false,
    D8: false,
    D9: false,
    D10: false,
  };

  private spots = { ...this.initialSpots };
  private spotsSubject = new BehaviorSubject<{ [key: string]: boolean }>({
    ...this.spots,
  });

  spots$ = this.spotsSubject.asObservable();
  constructor() {}

  isSpotTaken(spot: string): boolean {
    return this.spots[spot] || false;
  }

  bookSpot(spot: string): void {
    if (!this.spots[spot]) {
      this.spots[spot] = true;
      this.spotsSubject.next({ ...this.spots });
    }
  }
}
