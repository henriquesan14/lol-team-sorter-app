import { Injectable } from '@angular/core';
import { Credentials } from '../../core/models/credentials.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponseLogin } from '../../core/models/response-login.interface';
import { RefreshToken } from '../../core/models/refresh-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private API: string = `${environment.apiUrl}/auth`;
    constructor(private http: HttpClient) { }
  
    login(credentials: Credentials): Observable<ResponseLogin>{
      return this.http.post<ResponseLogin>(`${this.API}`, credentials);
    }

    refreshToken(refreshToken: RefreshToken): Observable<ResponseLogin>{
      return this.http.post<ResponseLogin>(`${this.API}/refresh-token`, refreshToken);
    }

    logout(refreshToken: string){
      return this.http.post(`${this.API}/logout`, {refreshToken});
    }
}
