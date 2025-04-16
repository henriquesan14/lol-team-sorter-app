import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  menuItems = [
    {
      title: 'Sorteio',
      icon: 'setting',
      children: [
        { label: 'Novo', link: '/matchmaking' },
        { label: 'Histórico', link: null }
      ]
    },
    {
      title: 'Jogadores',
      icon: 'user',
      children: [
        { label: 'Listar', link: '/players/list' },
        { label: 'Cadastrar', link: '/players/create' }
      ]
    }
  ];
}
