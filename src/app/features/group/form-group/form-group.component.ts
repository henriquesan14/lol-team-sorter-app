import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PermissionService } from '../../../shared/services/permission.service';
import { PermissionByCategory } from '../../../core/models/permission-by-category.interface';
import { finalize, Subject, takeUntil } from 'rxjs';
import { GroupService } from '../../../shared/services/group.service';
import { ToastrService } from 'ngx-toastr';
import { CreateGroup } from '../../../core/models/create-group.interface';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Group } from '../../../core/models/group.interface';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [NzFormModule, NzInputModule, ReactiveFormsModule, NzCheckboxModule, NzButtonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  groupForm!: FormGroup;

  permissions: PermissionByCategory[] = [];
  loadingGroup = false;

  constructor(
    private fb: FormBuilder,
    @Optional() private drawerRef: NzDrawerRef,
    @Optional() private modalRef: NzModalRef,
    private permissionService: PermissionService,
    private groupService: GroupService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(NZ_MODAL_DATA) public data: { groupToEdit: Group} 
  ) {}

  ngOnInit(): void {
    this.getPermissions();
    this.groupForm = this.fb.group({
      name: [null, Validators.required],
      permissions: this.fb.array([])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPermissions(){
    this.permissionService.getPermissions()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.permissions = res;
      }
    })
  }

  onCheckboxChange(event: boolean, permissionId: string): void {
    const formArray = this.groupForm.get('permissions') as FormArray;
    if (event) {
      if (!formArray.value.includes(permissionId)) {
        formArray.push(this.fb.control(permissionId));
      }
    } else {
      const index = formArray.controls.findIndex(x => x.value === permissionId);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  areAllSelected(perms: { id: string }[]): boolean {
    const selected = this.groupForm.get('permissions')?.value as string[];
    return perms.every(p => selected.includes(p.id));
  }
  
  toggleAll(perms: { id: string }[], checked: boolean): void {
    perms.forEach(p => this.onCheckboxChange(checked, p.id));
  }
  

  submit(): void {
    if (this.groupForm.valid) {
      this.loadingGroup = true;
      this.groupService.createGroup(this.groupForm.value as CreateGroup)
      .pipe(
        finalize(() => {
          this.loadingGroup = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.toastr.success('Grupo cadastrado com sucesso!', 'Sucesso')
          this.close(true);
        },
      })
      
    } else {
      this.groupForm.markAllAsTouched();
    }
  }

  close(result: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(result);
    } else if (this.modalRef) {
      this.modalRef.close(result);
    }
  }
}
