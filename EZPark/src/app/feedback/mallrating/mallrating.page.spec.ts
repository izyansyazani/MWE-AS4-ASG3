import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MallratingPage } from './mallrating.page';

describe('MallratingPage', () => {
  let component: MallratingPage;
  let fixture: ComponentFixture<MallratingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MallratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
