import { Injectable } from '@angular/core';
import { Credentials } from '../../core/models/credentials.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private API: string = `${environment.apiUrl}/auth`;
    constructor(private http: HttpClient) { }
  
    login(credentials: Credentials): Observable<User>{
      return this.http.post<User>(`${this.API}`, credentials);
    }

    refreshToken(): Observable<User>{
      return this.http.post<User>(`${this.API}/refresh-token`, {});
    }

    logout(){
      return this.http.post(`${this.API}/logout`, {},);
    }
}
