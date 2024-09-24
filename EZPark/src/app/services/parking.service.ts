import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private spots: { [key: string]: boolean } = {};

  constructor() {}

  isSpotTaken(spot: string): boolean {
    return this.spots[spot] === true;
  }

  bookSpot(spot: string): void {
    this.spots[spot] = true;
  }
}
