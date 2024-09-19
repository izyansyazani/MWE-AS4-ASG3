import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupLoginPage } from './signup-login.page';

describe('SignupLoginPage', () => {
  let component: SignupLoginPage;
  let fixture: ComponentFixture<SignupLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
