import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // BehaviorSubject to store the selected favorite parking spots
  private favoriteSpotsSubject = new BehaviorSubject<any[]>([]);
  
  // Observable to expose the favorite spots
  favoriteSpots$ = this.favoriteSpotsSubject.asObservable();

  constructor() {}

  // Add a parking spot to favorites
  addFavorite(spot: any) {
    const currentFavorites = this.favoriteSpotsSubject.getValue();
    if (!currentFavorites.some(fav => fav.id === spot.id)) {
      this.favoriteSpotsSubject.next([...currentFavorites, spot]);
    }
  }

  // Remove a parking spot from favorites
  removeFavorite(spot: any) {
    const updatedFavorites = this.favoriteSpotsSubject
      .getValue()
      .filter(fav => fav.id !== spot.id);
    this.favoriteSpotsSubject.next(updatedFavorites);
  }

  // Get all favorite parking spots
  getFavorites() {
    return this.favoriteSpotsSubject.getValue();
  }
}
