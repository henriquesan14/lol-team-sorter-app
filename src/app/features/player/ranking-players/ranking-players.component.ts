import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../core/models/player.interface';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking-players',
  standalone: true,
  imports: [NzTableModule, CommonModule],
  templateUrl: './ranking-players.component.html',
  styleUrl: './ranking-players.component.css'
})
export class RankingPlayersComponent implements OnInit, OnDestroy {
      private destroy$ = new Subject<void>();
      playerService = inject(PlayerService);

      players: Player[] = [];
      isLoading = false;
  
      ngOnInit(): void {
        this.getPlayers();
      }
  
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
  
      getPlayers(){
        const params = {
          orderBy: 'Victories',
          descending: true
        }
        this.isLoading = true;
          this.playerService.getPlayers(params)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (res) => {
                this.players = res;
                this.isLoading = false;
              },
              error: () => {
                this.isLoading = false;
              },
              complete: () => {
                this.isLoading = false;
              }
            })
      }
}
