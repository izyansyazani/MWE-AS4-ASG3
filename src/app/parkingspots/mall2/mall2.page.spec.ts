import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mall2Page } from './mall2.page';

describe('Mall2Page', () => {
  let component: Mall2Page;
  let fixture: ComponentFixture<Mall2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Mall2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
