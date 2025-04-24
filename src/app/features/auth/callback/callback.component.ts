import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  constructor(
    private localStorageService: LocalstorageService,
    private router: Router, 
  ) {}

  ngOnInit(): void {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const base64Data = params.get('data');

    if (base64Data) {
      const json = atob(base64Data);
      const authResponse = JSON.parse(json);

      this.localStorageService.setAuthStorage(authResponse);

      this.router.navigate(['/matchmaking/generate']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
