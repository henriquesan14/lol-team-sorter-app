import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { ChampionMastery } from '../../../core/models/champion-mastery.interface';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-champion-mastery',
  standalone: true,
  imports: [NzTableModule, NzAvatarModule, NzSpinModule],
  templateUrl: './champion-mastery.component.html',
  styleUrl: './champion-mastery.component.css',
  providers: [DecimalPipe]
})
export class ChampionMasteryComponent implements OnInit {
  championMasteries: ChampionMastery[] = [];
  loading = false;
  @Input({required: true}) riotId!: string;

  constructor(private playerService: PlayerService, private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    this.loadChampionMasteries();
  }

  loadChampionMasteries(): void {
    this.loading = true;
    this.playerService.getChampionMastery(this.riotId).subscribe({
      next: (data) => {
        this.championMasteries = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  formatPoints(points: number): string {
    return this.decimalPipe.transform(points, '1.0', 'pt-BR') + ' pts';
  }
}
