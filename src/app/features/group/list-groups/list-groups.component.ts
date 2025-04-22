import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { GroupService } from '../../../shared/services/group.service';
import { Group } from '../../../core/models/group.interface';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormGroupComponent } from '../form-group/form-group.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-list-groups',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, NzModalModule, NzIconModule, NzToolTipModule],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.css'
})
export class ListGroupsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
      confirmModal?: NzModalRef;
      private modal = inject(NzModalService);
      private toastr = inject(ToastrService);
      constructor(private groupService: GroupService){}
      
      groups: Group[] = [];
      checked = false;
      indeterminate = false;
      setOfCheckedId = new Set<string>();
      isLoadingUpdateTiers = false;
    
      ngOnInit(): void {
        this.getGroups();
      }
    
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
    
      getGroups(){
        this.groupService.getGroups()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              this.groups = res;
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
        const listOfEnabledData = this.groups.filter(({ disabled }) => !disabled);
        this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
        this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
      }
    
      onItemChecked(id: string, checked: boolean): void {
        this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
      }
    
      onAllChecked(checked: boolean): void {
        this.groups
          .filter(({ disabled }) => !disabled)
          .forEach(({ id }) => this.updateCheckedSet(id, checked));
        this.refreshCheckedStatus();
      }
    
      openNewGroupModal(): void {
        const modal = this.modal.create({
          nzTitle: 'Cadastrar grupo',
          nzContent: FormGroupComponent,
          nzWidth: '800px',
          nzFooter: null,
        });
    
        modal.afterClose.subscribe((result) => {
          if (result) {
            this.getGroups();
          }
        });
      }
    
      openEditGroupModal(group: Group): void {
        const modal = this.modal.create({
          nzTitle: 'Editar usuário',
          nzContent: FormGroupComponent,
          nzWidth: '800px',
          nzData:{
            groupToEdit: group
          },
          nzFooter: null
        });
        
        modal.afterClose.subscribe((result) => {
          if (result) {
            this.getGroups();
          }
        });
      }
    
      showConfirm(id: string): void {
        this.confirmModal = this.modal.confirm({
          nzTitle: 'Exclusão',
          nzContent: 'Tem certeza que quer remover este grupo?',
          nzOnOk: () =>
            this.groupService.deleteGroup(id).subscribe({
              next: () => {
                this.toastr.success('Grupo removido!', 'Sucesso');
                this.getGroups();
              }
            })
        });
      }
    
      showConfirmDeleteBatch(): void {
        this.confirmModal = this.modal.confirm({
          nzTitle: 'Exclusão',
          nzContent: 'Tem certeza que quer remover os grupos selecionados?',
          nzOnOk: () =>
           this.deletarPlayersBatch()
        });
      }
    
      deletarPlayersBatch() {
        const groupIds = this.groups.filter(data => this.setOfCheckedId.has(data.id)).map(p => p.id);
        this.groupService.deleteGroupsBatch(groupIds).subscribe({
          next: () => {
            this.toastr.success('Grupos removidos!', 'Sucesso');
            this.getGroups();
          }
        });
      }
}
