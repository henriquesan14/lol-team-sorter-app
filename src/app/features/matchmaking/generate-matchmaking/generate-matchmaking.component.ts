import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../core/models/player.interface';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { MatchmakingService } from '../../../shared/services/matchmaking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-matchmaking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-matchmaking.component.html',
  styleUrl: './generate-matchmaking.component.css'
})
export class GenerateMatchmakingComponent implements OnInit {
  
  constructor(private playerService: PlayerService, private matchmakingService: MatchmakingService){}
  matchmakingResult!: Matchmaking;
  
  players: Player[] = [];
  selectedPlayers: string[] = [];

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(){
    this.playerService.getPlayers().subscribe({
      next: (res) => {
        this.players = res;
      }
    })
  }

  generateMatchmaking(mode: string){
    this.matchmakingService.generateMatchmaking({
      mode,
      playerIds: this.selectedPlayers
    }).subscribe({
      next: (res) => {
        this.matchmakingResult = res;
      }
    })
  }

  reset(): void {
    this.matchmakingResult = <Matchmaking>{};
    this.selectedPlayers = [];
  }

  isSelected(player: Player): boolean {
    return this.selectedPlayers.some(p => p === player.id);
  }

  toggleSelection(player: Player): void {
    if (this.isSelected(player)) {
      this.selectedPlayers = this.selectedPlayers.filter(p => p !== player.id);
    } else {
      this.selectedPlayers.push(player.id);
    }
  }



}
