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

  updateGroup(group: CreateGroup){
    return this.http.put(`${this.API}/`, group);
  }

  deleteGroup(id: string){
    return this.http.delete(`${this.API}/${id}`,);
  }

  deleteGroupsBatch(groupIds: string[]){
    return this.http.post(`${this.API}/delete`, {groupIds});
  }

  getGroupById(id: string): Observable<Group>{
    return this.http.get<Group>(`${this.API}/${id}`);
  }
}
