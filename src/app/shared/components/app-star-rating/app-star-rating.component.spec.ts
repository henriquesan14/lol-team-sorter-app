import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStarRatingComponent } from './app-star-rating.component';

describe('AppStarRatingComponent', () => {
  let component: AppStarRatingComponent;
  let fixture: ComponentFixture<AppStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStarRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
