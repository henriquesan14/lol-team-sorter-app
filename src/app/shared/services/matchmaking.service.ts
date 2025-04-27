import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Matchmaking } from '../../core/models/matchmaking.interface';
import { CreateMatchmaking } from '../../core/models/create-matchmaking.interface';
import { PaginatedResult } from '../../core/models/paginated-result.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  private API: string = `${environment.apiUrl}/matchmaking`;
  constructor(private http: HttpClient) { }

  generateMatchmaking(createMatchmaking: CreateMatchmaking): Observable<Matchmaking>{
    return this.http.post<Matchmaking>(`${this.API}/`, createMatchmaking);
  }

  getMatchmakings(parametros: any): Observable<PaginatedResult<Matchmaking>>{
    let params = new HttpParams();
    for (const key in parametros) {
      if (parametros.hasOwnProperty(key) && parametros[key] !== null && parametros[key] !== undefined && parametros[key] !== '') {
        params = params.append(key, parametros[key]);
      }
    }
    return this.http.get<PaginatedResult<Matchmaking>>(`${this.API}/`, {params});
  }

  deleteMatchmaking(id: string){
    return this.http.delete(`${this.API}/${id}`);
}

  deleteMatchmakingsBatch(matchmakingIds: string[]){
      return this.http.post(`${this.API}/delete`, {matchmakingIds});
  }

  finishMatch(matchmakingId: string, winningTeamId: string){
    return this.http.post(`${this.API}/finish`, {matchmakingId, winningTeamId});
  }
}
