import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { ChampionRankedStat } from '../../../core/models/champion-ranked-stat.interface';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-champion-ranked-stats',
  standalone: true,
  imports: [NzTableModule, NzAvatarModule, NzSpinModule],
  templateUrl: './champion-ranked-stats.component.html',
  styleUrl: './champion-ranked-stats.component.css'
})
export class ChampionRankedStatsComponent implements OnInit {
  @Input({required: true}) riotId!: string; 
  championRankedStats: ChampionRankedStat[] = [];
  loading = false;  

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadLastRankedMatches();
  }

  loadLastRankedMatches() {
    this.loading = true;
    this.playerService.getChampionRankedStats(this.riotId).subscribe({
      next: (res) => {
        this.championRankedStats = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });    
  }
}
