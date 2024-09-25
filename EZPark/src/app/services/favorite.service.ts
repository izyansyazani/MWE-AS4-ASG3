import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteParkingSpotsSubject = new BehaviorSubject<string[]>([]);
  favoriteParkingSpots$ = this.favoriteParkingSpotsSubject.asObservable();

  constructor() {}

  addFavorite(spot: string) {
    const currentFavorites = this.favoriteParkingSpotsSubject.value;
    this.favoriteParkingSpotsSubject.next([...currentFavorites, spot]);
  }

  getFavorites() {
    return this.favoriteParkingSpotsSubject.value;
  }
}
