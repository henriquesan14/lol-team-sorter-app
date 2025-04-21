import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/models/user.interface';
import { Observable } from 'rxjs';
import { CreateUser } from '../../core/models/create-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API: string = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.API}/`);
  }

  createUser(user: CreateUser): Observable<User>{
    return this.http.post<User>(`${this.API}/`, user);
  }

  updateUser(user: CreateUser){
    return this.http.put(`${this.API}/`, user);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.API}/${id}`,);
  }

  deleteUsersBatch(userIds: string[]){
    return this.http.post(`${this.API}/delete`, {userIds});
  }
}
