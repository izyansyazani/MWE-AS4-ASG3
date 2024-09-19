import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimessquarePage } from './timessquare.page';

describe('TimessquarePage', () => {
  let component: TimessquarePage;
  let fixture: ComponentFixture<TimessquarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimessquarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
