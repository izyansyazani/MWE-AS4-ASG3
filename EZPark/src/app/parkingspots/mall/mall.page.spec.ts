import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MallPage } from './mall.page';

describe('MallPage', () => {
  let component: MallPage;
  let fixture: ComponentFixture<MallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
