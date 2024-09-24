import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private parkingData = {
    mall: {
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
    },
    airport: { B1: false, B2: false, B3: true },
  };

  private currentParkingSpots = new BehaviorSubject<{ [key: string]: boolean }>(
    {}
  );

  constructor() {}

  getParkingSpots(location: string): Observable<{ [key: string]: boolean }> {
    const data = this.parkingData[location];
    if (data) {
      this.currentParkingSpots.next(data);
    }
    return this.currentParkingSpots.asObservable();
  }

  updateParkingSpot(location: string, spot: string, isTaken: boolean): void {
    if (
      this.parkingData[location] &&
      this.parkingData[location][spot] !== undefined
    ) {
      this.parkingData[location][spot] = isTaken;
      this.currentParkingSpots.next(this.parkingData[location]);
    }
  }
}
