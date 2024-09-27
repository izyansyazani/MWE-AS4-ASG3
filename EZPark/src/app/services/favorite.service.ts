import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteParkingSpotsSubject = new BehaviorSubject<string[]>([]);
  favoriteParkingSpots$ = this.favoriteParkingSpotsSubject.asObservable();

  constructor(private firestore: Firestore) {}

  // Adds a parking spot to local favorites
  addFavorite(spot: string) {
    const currentFavorites = this.favoriteParkingSpotsSubject.value;
    this.favoriteParkingSpotsSubject.next([...currentFavorites, spot]);
  }

  // Removes a parking spot from local favorites
  removeFavorite(spot: string) {
    const currentFavorites = this.favoriteParkingSpotsSubject.value;
    this.favoriteParkingSpotsSubject.next(currentFavorites.filter(s => s !== spot));
  }

  // Retrieves the current list of favorite parking spots
  getFavorites() {
    return this.favoriteParkingSpotsSubject.value;
  }

  // Adds a parking spot to Firestore and updates the local favorites list
  async addFavoriteParking(userId: string, mallName: string, spot: { title: string; location: string; imageUrl: string }): Promise<void> {
    const favoriteParkingDocRef = doc(this.firestore, `users/${userId}/favoriteParking/${mallName}`);
    await setDoc(favoriteParkingDocRef, spot);
    
    // Update the local favorites list
    this.addFavorite(mallName);
    console.log(`Added ${mallName} to favorite parking`);
  }

  // Removes a parking spot from favorites in Firestore and updates the local favorites list
  async removeFavoriteParking(userId: string, parkingSpotId: string): Promise<void> {
    const favoriteDocRef = doc(this.firestore, `users/${userId}/favoriteParking/${parkingSpotId}`);
    await deleteDoc(favoriteDocRef);

    // Optionally, update the local favorites list
    this.removeFavorite(parkingSpotId); // Update local favorites
    console.log(`Removed ${parkingSpotId} from favorite parking`);
  }
}
