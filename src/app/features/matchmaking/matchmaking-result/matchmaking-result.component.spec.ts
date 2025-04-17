import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingResultComponent } from './matchmaking-result.component';

describe('MatchmakingResultComponent', () => {
  let component: MatchmakingResultComponent;
  let fixture: ComponentFixture<MatchmakingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchmakingResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchmakingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
