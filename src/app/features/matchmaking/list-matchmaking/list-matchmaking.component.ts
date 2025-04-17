import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatchmakingService } from '../../../shared/services/matchmaking.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { MatchmakingResultComponent } from '../matchmaking-result/matchmaking-result.component';

@Component({
  selector: 'app-list-matchmaking',
  standalone: true,
  imports: [NzTableModule, CommonModule, NzButtonModule, NzIconModule, NzToolTipModule, NzModalModule],
  templateUrl: './list-matchmaking.component.html',
  styleUrl: './list-matchmaking.component.css'
})
export class ListMatchmakingComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    modal = inject(NzModalService);
    matchmakings: Matchmaking[] = [];
    checked = false;
    indeterminate = false;
    setOfCheckedId = new Set<string>();

    matchmakingService = inject(MatchmakingService);

    ngOnInit(): void {
      this.getMatchmakings();
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    getMatchmakings(){
        this.matchmakingService.getMatchmakings()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              this.matchmakings = res;
            }
          })
    }

    openShowMatchmaking(matchmaking: Matchmaking): void {
        this.modal.create({
          nzTitle: `Sorteio Nº ${matchmaking.id}`,
          nzContent: MatchmakingResultComponent,
          nzWidth: '800px',
          nzData:{
            matchmaking: matchmaking
          },
          nzFooter: null
        });
    }

    onAllChecked(checked: boolean): void {
      this.matchmakings
        .filter(({ disabled }) => !disabled)
        .forEach(({ id }) => this.updateCheckedSet(id, checked));
      this.refreshCheckedStatus();
    }

    onItemChecked(id: string, checked: boolean): void {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
      const listOfEnabledData = this.matchmakings.filter(({ disabled }) => !disabled);
      this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
      this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    }

    updateCheckedSet(id: string, checked: boolean): void {
      if (checked) {
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
      }
    }
}
