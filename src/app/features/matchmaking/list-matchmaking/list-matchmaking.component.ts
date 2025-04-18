import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Matchmaking } from '../../../core/models/matchmaking.interface';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatchmakingService } from '../../../shared/services/matchmaking.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MatchmakingResultComponent } from '../matchmaking-result/matchmaking-result.component';
import { PaginatedResult } from '../../../core/models/paginated-result.interface';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-matchmaking',
  standalone: true,
  imports: [NzTableModule, CommonModule, NzButtonModule, NzIconModule, NzToolTipModule, NzModalModule, NzPaginationModule, NzSelectModule, NzFormModule,
     ReactiveFormsModule, NzDatePickerModule, NzIconModule],
  templateUrl: './list-matchmaking.component.html',
  styleUrl: './list-matchmaking.component.css'
})
export class ListMatchmakingComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    private modal = inject(NzModalService);
    private fb = inject(FormBuilder);
    private toastr = inject(ToastrService);
    confirmModal?: NzModalRef;
    matchmakingService = inject(MatchmakingService);
    paginatedMatchmaking: PaginatedResult<Matchmaking> = <PaginatedResult<Matchmaking>>{};
    checked = false;
    indeterminate = false;
    setOfCheckedId = new Set<string>();
    isLoading = false;
    matchmakingModes = [
      {
        label: 'Todos',
        value: ''
      },
      {
        label: 'Stars',
        value: 'STARS'
      },
      {
        label: 'Tier',
        value: 'TIER'
      },
      {
        label: 'Lane',
        value: 'LANE'
      },
      {
        label: 'Random',
        value: 'RANDOM'
      },
    ];
    
    filterForm = this.fb.group({
      mode: [''],
      dateRange: [null]
    });

    ngOnInit(): void {
      this.getMatchmakings(null);
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    getMatchmakings(params: any){
      this.isLoading = true;
        this.matchmakingService.getMatchmakings(params)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              this.paginatedMatchmaking = res;
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
      this.paginatedMatchmaking.data
        .filter(({ disabled }) => !disabled)
        .forEach(({ id }) => this.updateCheckedSet(id, checked));
      this.refreshCheckedStatus();
    }

    onItemChecked(id: string, checked: boolean): void {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
      const listOfEnabledData = this.paginatedMatchmaking.data.filter(({ disabled }) => !disabled);
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

    onPageChange(event: number){
      const { mode, dateRange } = this.filterForm.value;
      const params = {
        pageNumber: event,
        pageSize: this.paginatedMatchmaking.pageSize,
        mode,
        startDate: dateRange? (dateRange as Date[])[0].toISOString() : null,
        endDate: dateRange? (dateRange as Date[])[1].toISOString() : null
      }
      this.getMatchmakings(params);
      this.checked = false;
    }

    onPageSizeChange(event: number){
      const { mode, dateRange } = this.filterForm.value;
      const params = {
        pageNumber: this.paginatedMatchmaking.pageNumber,
        pageSize: event,
        mode,
        startDate: dateRange? (dateRange as Date[])[0].toISOString() : null,
        endDate: dateRange? (dateRange as Date[])[1].toISOString() : null
      }
      this.getMatchmakings(params);
    }

    onFilter() {
      const { mode, dateRange } = this.filterForm.value;
    
      const params: any = {
        mode,
        startDate: dateRange? (dateRange as Date[])[0].toISOString() : null,
        endDate: dateRange? (dateRange as Date[])[1].toISOString() : null
      };
      
      this.isLoading = true;
      this.matchmakingService.getMatchmakings(params).subscribe({
        next: data => {
          this.paginatedMatchmaking = data;
          this.isLoading = false;
        },
        error: err => {
          console.error('Erro ao carregar matchmakings', err);
          this.isLoading = false;
        }
      });
    }

    showConfirmDelete(id: string): void {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Exclusão',
        nzContent: 'Tem certeza que quer remover este sorteio?',
        nzOnOk: () =>
         this.deleteMatchmaking(id)
      });
    }

    deleteMatchmaking(id: string) {
      this.matchmakingService.deleteMatchmaking(id).subscribe({
        next: () => {
          this.toastr.success('Sorteio removido!', 'Sucesso');
          this.getMatchmakings(null);
        }
      });
    }

    showConfirmDeleteBatch(): void {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Exclusão',
        nzContent: 'Tem certeza que quer remover os sorteios selecionados?',
        nzOnOk: () =>
         this.deleteMatchmakingsBatch()
      });
    }

    deleteMatchmakingsBatch() {
      const playerIds = this.paginatedMatchmaking.data.filter(data => this.setOfCheckedId.has(data.id)).map(p => p.id);
      this.matchmakingService.deleteMatchmakingsBatch(playerIds).subscribe({
        next: () => {
          this.toastr.success('Sorteios removidos!', 'Sucesso');
          this.getMatchmakings(null);
          this.checked = false;
        }
      });
    }
}
