import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YayasanratingPage } from './yayasanrating.page';

describe('YayasanratingPage', () => {
  let component: YayasanratingPage;
  let fixture: ComponentFixture<YayasanratingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YayasanratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
