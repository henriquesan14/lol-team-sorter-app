import { Component, Inject, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject } from 'rxjs';
import { AppStarRatingComponent } from '../../../shared/components/app-star-rating/app-star-rating.component';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../shared/services/player.service';
import { CreatePlayer } from '../../../core/models/create-player.interface';
import { ToastrService } from 'ngx-toastr';
import { Player } from '../../../core/models/player.interface';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-form-player',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonComponent, AppStarRatingComponent, CommonModule],
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.css'
})
export class FormPlayerComponent implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  private playerService = inject(PlayerService);
  private toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();
  isSubmitting = false;

  constructor(private modalRef: NzModalRef, @Inject(NZ_MODAL_DATA) public data: { playerToEdit: Player }) {}

  playerForm: FormGroup<{
    name: FormControl<string>;
    riotName: FormControl<string>;
    riotTag: FormControl<string>;
    mainLane: FormControl<string>;
    secondaryLane: FormControl<string>;
    stars: FormControl<number>;
  }> = this.fb.group({
    name: this.fb.control('', Validators.required),
    riotName: this.fb.control('', Validators.required),
    riotTag: this.fb.control('#BR1', [Validators.required, Validators.pattern(/^#[A-Za-z0-9]+$/),]),
    mainLane: this.fb.control('TOP', Validators.required),
    secondaryLane: this.fb.control('TOP', Validators.required),
    stars: this.fb.control(3, Validators.required),
  });

  ngOnInit(): void {
    if (this.data?.playerToEdit) {
      this.playerForm.patchValue({
        name: this.data.playerToEdit.name,
        riotName: this.data.playerToEdit.riotName,
        riotTag: `#${this.data.playerToEdit.riotTag}`,
        mainLane: this.data.playerToEdit.mainLane,
        secondaryLane: this.data.playerToEdit.secondaryLane,
        stars: this.data.playerToEdit.stars,
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.playerForm.invalid) {
      this.markFormGroupTouched(this.playerForm);
      return;
    }

    this.isSubmitting = true;
  
    const { riotName, riotTag, ...rest } = this.playerForm.value;
  
    const payload = {
      ...rest,
      name: this.playerForm.value.name!,
      riotName: riotName!,
      riotTag: riotTag!.toUpperCase().replace('#', ''),
    } as CreatePlayer;

    if(this.data && this.data.playerToEdit){
      this.updatePlayer(payload);
    }else{
      this.createPlayer(payload);
    }
  }

  createPlayer(payload: CreatePlayer){
    this.playerService.createPlayer(payload).subscribe({
      next: () => {
        this.toastr.success('Jogador cadastrado!', 'Sucesso');
        this.resetForm();
        this.modalRef.close(true);
      },
      error: (err) => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  updatePlayer(payload: CreatePlayer){
    payload.id = this.data.playerToEdit.id;
    this.playerService.updatePlayer(payload).subscribe({
      next: () => {
        this.toastr.success('Jogador atualizado!', 'Sucesso');
        this.resetForm();
        this.modalRef.close(true);
      },
      error: (err) => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
  }
  
  private resetForm(){
    this.playerForm.reset({
      name: '',
      riotName: '',
      riotTag: '',
      mainLane: 'TOP',
      secondaryLane: 'TOP',
      stars: 3,
    });
  }
}
