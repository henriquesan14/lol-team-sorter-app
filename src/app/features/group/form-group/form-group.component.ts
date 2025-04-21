import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PermissionService } from '../../../shared/services/permission.service';
import { PermissionByCategory } from '../../../core/models/permission-by-category.interface';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private permissionService: PermissionService
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
    console.log(this.groupForm)
    if (this.groupForm.valid) {
      // Aqui você faria a chamada para criar o grupo no back-end
      console.log('Grupo criado:', this.groupForm.value);
      // this.drawerRef.close(true);
    } else {
      this.groupForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.drawerRef.close(false);
  }
}
