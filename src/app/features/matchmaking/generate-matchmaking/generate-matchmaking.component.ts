import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../core/models/player.interface';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { MatchmakingService } from '../../../shared/services/matchmaking.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule  } from 'ng-zorro-antd/grid';
import { NzCardComponent  } from 'ng-zorro-antd/card';
import { AppStarRatingComponent } from '../../../shared/components/app-star-rating/app-star-rating.component';

@Component({
  selector: 'app-generate-matchmaking',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzTableModule, AppStarRatingComponent, NzGridModule, NzCardComponent ],
  templateUrl: './generate-matchmaking.component.html',
  styleUrl: './generate-matchmaking.component.css'
})
export class GenerateMatchmakingComponent implements OnInit {
  
  constructor(private playerService: PlayerService, private matchmakingService: MatchmakingService){}
  matchmakingResult?: Matchmaking;
  
  players: Player[] = [];
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();

  rate= 5;
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
    const playerIds = this.players.filter(data => this.setOfCheckedId.has(data.id)).map(p => p.id);
    this.matchmakingService.generateMatchmaking({
      mode,
      playerIds
    }).subscribe({
      next: (res) => {
        this.matchmakingResult = res;
      }
    })
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.players.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.players
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  reset(){
    this.matchmakingResult = undefined;
  }
}
