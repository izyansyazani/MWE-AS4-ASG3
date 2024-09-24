import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a favorite spot', () => {
    const spot = { id: 1, name: 'Spot 1' };
    service.addFavorite(spot);
    expect(service.getFavorites().length).toBe(1);
  });

  it('should remove a favorite spot', () => {
    const spot = { id: 1, name: 'Spot 1' };
    service.addFavorite(spot);
    service.removeFavorite(spot);
    expect(service.getFavorites().length).toBe(0);
  });

  it('should not add the same spot twice', () => {
    const spot = { id: 1, name: 'Spot 1' };
    service.addFavorite(spot);
    service.addFavorite(spot);
    expect(service.getFavorites().length).toBe(1);
  });
});

