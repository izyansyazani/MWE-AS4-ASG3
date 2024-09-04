import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YayasanPage } from './yayasan.page';

describe('YayasanPage', () => {
  let component: YayasanPage;
  let fixture: ComponentFixture<YayasanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YayasanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
