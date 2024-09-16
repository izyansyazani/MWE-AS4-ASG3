import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations : [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])]
    }).compileComponents();

  });
    
    it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
