import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteServiceTsPage } from './favorite.service.ts.page';

describe('FavoriteServiceTsPage', () => {
  let component: FavoriteServiceTsPage;
  let fixture: ComponentFixture<FavoriteServiceTsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteServiceTsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
