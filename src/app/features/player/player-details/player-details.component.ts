import { Component, Inject } from '@angular/core';
import { ChampionMasteryComponent } from '../champion-mastery/champion-mastery.component';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ChampionRankedStatsComponent } from '../champion-ranked-stats/champion-ranked-stats.component';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [ ChampionMasteryComponent, ChampionRankedStatsComponent],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
})
export class PlayerDetailsComponent {
  

  constructor(@Inject(NZ_MODAL_DATA) public data: { riotId: string }) {}
}
