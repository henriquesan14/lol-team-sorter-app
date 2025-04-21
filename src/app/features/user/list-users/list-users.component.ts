import { Component, inject } from '@angular/core';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../core/models/user.interface';
import { ToastrService } from 'ngx-toastr';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, NzIconModule, NzModalModule, NzToolTipModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
    private destroy$ = new Subject<void>();
    confirmModal?: NzModalRef;
    private modal = inject(NzModalService);
    private toastr = inject(ToastrService);
    constructor(private userService: UserService){}
    
    users: User[] = [];
    checked = false;
    indeterminate = false;
    setOfCheckedId = new Set<string>();
    isLoadingUpdateTiers = false;
  
    ngOnInit(): void {
      this.getUsers();
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    getUsers(){
      this.userService.getUsers()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.users = res;
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
      const listOfEnabledData = this.users.filter(({ disabled }) => !disabled);
      this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
      this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    }
  
    onItemChecked(id: string, checked: boolean): void {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }
  
    onAllChecked(checked: boolean): void {
      this.users
        .filter(({ disabled }) => !disabled)
        .forEach(({ id }) => this.updateCheckedSet(id, checked));
      this.refreshCheckedStatus();
    }
  
    openNewPlayerModal(): void {
      const modal = this.modal.create({
        nzTitle: 'Cadastrar usuário',
        nzContent: FormUserComponent,
        nzWidth: '800px',
        nzFooter: null,
      });
  
      modal.afterClose.subscribe((result) => {
        if (result) {
          this.getUsers();
        }
      });
    }
  
    openEditPlayerModal(user: User): void {
      const modal = this.modal.create({
        nzTitle: 'Editar usuário',
        nzContent: FormUserComponent,
        nzWidth: '800px',
        nzData:{
          userToEdit: user
        },
        nzFooter: null
      });
      
      modal.afterClose.subscribe((result) => {
        if (result) {
          this.getUsers();
        }
      });
    }
  
    showConfirm(id: string): void {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Exclusão',
        nzContent: 'Tem certeza que quer remover este usuário?',
        nzOnOk: () =>
          this.userService.deleteUser(id).subscribe({
            next: () => {
              this.toastr.success('Usuário removido!', 'Sucesso');
              this.getUsers();
            }
          })
      });
    }
  
    showConfirmDeleteBatch(): void {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Exclusão',
        nzContent: 'Tem certeza que quer remover os usuários selecionados?',
        nzOnOk: () =>
         this.deletarPlayersBatch()
      });
    }
  
    deletarPlayersBatch() {
      const userIds = this.users.filter(data => this.setOfCheckedId.has(data.id)).map(p => p.id);
      this.userService.deleteUsersBatch(userIds).subscribe({
        next: () => {
          this.toastr.success('Usuários removidos!', 'Sucesso');
          this.getUsers();
        }
      });
    }
}
