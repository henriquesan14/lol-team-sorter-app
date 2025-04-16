import { Component, inject, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../core/models/player.interface';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { MatchmakingService } from '../../../shared/services/matchmaking.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule  } from 'ng-zorro-antd/grid';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppStarRatingComponent } from '../../../shared/components/app-star-rating/app-star-rating.component';
import { FormPlayerComponent } from '../../player/form-player/form-player.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-generate-matchmaking',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzTableModule, AppStarRatingComponent, NzGridModule, NzModalModule, NzIconModule, NzToolTipModule ],
  templateUrl: './generate-matchmaking.component.html',
  styleUrl: './generate-matchmaking.component.css',
})
export class GenerateMatchmakingComponent implements OnInit {
  
  confirmModal?: NzModalRef;
  private modal = inject(NzModalService);
  private toastr = inject(ToastrService);
  constructor(private playerService: PlayerService, private matchmakingService: MatchmakingService){}
  matchmakingResult?: Matchmaking;
  
  players: Player[] = [];
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();

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

  updateRankedTier(id: string){
    this.playerService.updateRankedTier(id).subscribe({
      next: () => {
        this.toastr.success('Rank do jogador atualizado!', 'Sucesso');
        this.getPlayers();
      }
    })
  }

  openNewPlayerModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Cadastrar jogador',
      nzContent: FormPlayerComponent,
      nzWidth: '800px',
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.getPlayers(); // Atualiza a lista se o form mandou ok
      }
    });
  }

  openEditPlayerModal(player: Player): void {
    const modal = this.modal.create({
      nzTitle: 'Editar jogador',
      nzContent: FormPlayerComponent,
      nzWidth: '800px',
      nzData:{
        playerToEdit: player
      },
      nzFooter: null
    });
    
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.getPlayers(); // Atualiza a lista se o form mandou ok
      }
    });
  }

  showConfirm(id: string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Exclusão',
      nzContent: 'Tem certeza que quer remover este jogador?',
      nzOnOk: () =>
        this.playerService.deletePlayer(id).subscribe({
          next: () => {
            this.toastr.success('Jogador removido!', 'Sucesso');
            this.getPlayers();
          }
        })
    });
  }
}
