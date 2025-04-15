import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Matchmaking } from '../../core/models/matchmaking.interface';
import { CreateMatchmaking } from '../../core/models/create-matchmaking.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  private API: string = `${environment.apiUrl}/matchmaking`;
  constructor(private http: HttpClient) { }

  generateMatchmaking(createMatchmaking: CreateMatchmaking): Observable<Matchmaking>{
    return this.http.post<Matchmaking>(`${this.API}/`, createMatchmaking);
  }

  getMatchmakings(): Observable<Matchmaking[]>{
    return this.http.get<Matchmaking[]>(`${this.API}/`);
  }
}
