import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../../core/models/player.interface';
import { CreatePlayer } from '../../core/models/create-player.interface';
import { ChampionMastery } from '../../core/models/champion-mastery.interface';
import { ChampionRankedStat } from '../../core/models/champion-ranked-stat.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private API: string = `${environment.apiUrl}/players`;
    constructor(private http: HttpClient) { }
  
    createPlayer(player: CreatePlayer): Observable<Player>{
      return this.http.post<Player>(`${this.API}/`, player);
    }

    getPlayers(parametros: any): Observable<Player[]>{
      let params = new HttpParams();
      for (const key in parametros) {
        if (parametros.hasOwnProperty(key) && parametros[key] !== null && parametros[key] !== undefined && parametros[key] !== '') {
          params = params.append(key, parametros[key]);
        }
      }
      return this.http.get<Player[]>(`${this.API}/`, {params});
    }

    updatePlayer(player: CreatePlayer){
      return this.http.put(`${this.API}/`, player);
    }

    deletePlayer(id: string){
      return this.http.delete(`${this.API}/${id}`,);
    }

    deletePlayersBatch(playerIds: string[]){
      return this.http.post(`${this.API}/delete`, {playerIds});
    }

    updateRankedTier(id: string){
      return this.http.patch(`${this.API}/${id}`, {id});
    }

    updateRankedTiersBtach(playerIds: string[]){
      return this.http.post(`${this.API}/update-ranked-tiers`, {playerIds});
    }

    getChampionMastery(riotId: string): Observable<ChampionMastery[]> {
      return this.http.get<ChampionMastery[]>(`${this.API}/${riotId}/championMasteries`);
    }

    getChampionRankedStats(riotId: string): Observable<ChampionRankedStat[]> {
      return this.http.get<ChampionRankedStat[]>(`${this.API}/${riotId}/champion-ranked-stats`);
    }
}
