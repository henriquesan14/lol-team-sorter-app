import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UpdatePassword } from '../../core/models/update-password.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    private API: string = `${environment.apiUrl}/account`;
    constructor(private http: HttpClient) { }
  
    updatePassword(updatePassword: UpdatePassword){
      return this.http.put(`${this.API}`, updatePassword);
    }
}
