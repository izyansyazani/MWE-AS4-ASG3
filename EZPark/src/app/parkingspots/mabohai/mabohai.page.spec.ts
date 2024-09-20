import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MabohaiPage } from './mabohai.page';

describe('MabohaiPage', () => {
  let component: MabohaiPage;
  let fixture: ComponentFixture<MabohaiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MabohaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
