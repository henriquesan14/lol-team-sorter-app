import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LocalstorageService } from '../../../shared/services/local-storage.service';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterModule, NzDropdownMenuComponent, NzDropDownModule, HasRoleDirective],
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
      permission: 'VIEW_MATCHMAKING',
      children: [
        { label: 'Novo', link: 'matchmaking/generate', permission: 'GENERATE_MATCHMAKING' },
        { label: 'Histórico', link: 'matchmaking/list', permission: 'VIEW_MATCHMAKING' }
      ]
    },
    {
      title: 'Controle de acesso',
      icon: 'lock',
      permission: 'VIEW_USER',
      children: [
        { label: 'Usuários', link: 'users/list', permission: 'VIEW_USER', },
        { label: 'Grupos', link: 'groups/list', permission: 'VIEW_USER', },
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
    return response?.user.name;
  }
}
