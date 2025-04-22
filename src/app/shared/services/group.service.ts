import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from '../../core/models/group.interface';
import { Observable } from 'rxjs';
import { CreateGroup } from '../../core/models/create-group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private API: string = `${environment.apiUrl}/groups`;
  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`${this.API}/`);
  }

  createGroup(group: CreateGroup): Observable<string>{
    return this.http.post<string>(`${this.API}/`, group);
  }
}
