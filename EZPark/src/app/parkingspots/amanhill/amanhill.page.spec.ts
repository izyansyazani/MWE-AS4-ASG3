import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmanhillPage } from './amanhill.page';

describe('AmanhillPage', () => {
  let component: AmanhillPage;
  let fixture: ComponentFixture<AmanhillPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AmanhillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
