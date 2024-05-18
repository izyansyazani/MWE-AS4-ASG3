import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmanHillsPage } from './aman-hills.page';

describe('AmanHillsPage', () => {
  let component: AmanHillsPage;
  let fixture: ComponentFixture<AmanHillsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AmanHillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
