import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionRankedStatsComponent } from './champion-ranked-stats.component';

describe('ChampionRankedStatsComponent', () => {
  let component: ChampionRankedStatsComponent;
  let fixture: ComponentFixture<ChampionRankedStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionRankedStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionRankedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
