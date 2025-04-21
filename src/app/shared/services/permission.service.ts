import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermissionByCategory } from '../../core/models/permission-by-category.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private API: string = `${environment.apiUrl}/permissions`;
      constructor(private http: HttpClient) { }
    
      getPermissions(): Observable<PermissionByCategory[]>{
        return this.http.get<PermissionByCategory[]>(`${this.API}/`);
      }
}
