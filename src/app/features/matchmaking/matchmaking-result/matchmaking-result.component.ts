import { Component, Inject, Input, Optional } from '@angular/core';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-matchmaking-result',
  standalone: true,
  imports: [],
  templateUrl: './matchmaking-result.component.html',
  styleUrl: './matchmaking-result.component.css'
})
export class MatchmakingResultComponent {

  @Input({required: true})matchmakingResult!: Matchmaking;
  constructor(@Inject(NZ_MODAL_DATA) @Optional() public data?: { matchmaking: Matchmaking }) {
    if (data?.matchmaking) {
      this.matchmakingResult = data.matchmaking;
    }
  }
}
