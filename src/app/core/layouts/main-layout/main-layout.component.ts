import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LocalstorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterModule, NzDropdownMenuComponent, NzDropDownModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  isCollapsed = false;
  private router = inject(Router);
  private localStorageService = inject(LocalstorageService);

  menuItems = [
    {
      title: 'Sorteio',
      icon: 'setting',
      children: [
        { label: 'Novo', link: 'matchmaking/generate' },
        { label: 'Histórico', link: 'matchmaking/list' }
      ]
    },
  ]

  goToProfile() {
    
  }
  
  logout() {
    this.localStorageService.removeAuthStorage();
    this.router.navigateByUrl('/login');
  }

  get nomeUsuario(){
    const response = this.localStorageService.getAuthStorage();
    return response.user.name;
  }
}
