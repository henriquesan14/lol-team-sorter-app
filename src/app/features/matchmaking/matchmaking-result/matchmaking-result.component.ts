import { Component, inject, Inject, Input, Optional } from '@angular/core';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { Player } from '../../../core/models/player.interface';
import { PlayerDetailsComponent } from '../../player/player-details/player-details.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ToastrService } from 'ngx-toastr';
import { MatchmakingService } from '../../../shared/services/matchmaking.service';
import { Team } from '../../../core/models/team.interface';

@Component({
  selector: 'app-matchmaking-result',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzToolTipModule],
  templateUrl: './matchmaking-result.component.html',
  styleUrl: './matchmaking-result.component.css'
})
export class MatchmakingResultComponent {
  private modal = inject(NzModalService);
  private toastr = inject(ToastrService);
  private matchmakingService = inject(MatchmakingService);
  
  @Input({required: true})matchmakingResult!: Matchmaking;
  constructor(@Inject(NZ_MODAL_DATA) @Optional() public data?: { matchmaking: Matchmaking }) {
    if (data?.matchmaking) {
      this.matchmakingResult = data.matchmaking;
    }
  }

  visualizar(player: Player){
      this.modal.create({
        nzTitle: `Estatísticas do jogador: ${player.riotName}#${player.riotTag}`,
        nzContent: PlayerDetailsComponent,
        nzWidth: '800px',
        nzData:{
          riotId : player.riotId
        },
        nzFooter: null
      });
  }

  selecionarVencedor(teamId: string): void {
    this.matchmakingService.finishMatch(this.matchmakingResult.id, teamId)
      .subscribe({
        next: () => {
          this.toastr.success('Partida finalizada com sucesso!');
          this.matchmakingResult.winningTeam = {
            id: teamId
          } as Team;
        },
        error: () => {
          this.toastr.error('Erro ao finalizar a partida.');
        }
      });
  }
}
