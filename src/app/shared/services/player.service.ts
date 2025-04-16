import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../../core/models/player.interface';
import { CreatePlayer } from '../../core/models/create-player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private API: string = `${environment.apiUrl}/players`;
    constructor(private http: HttpClient) { }
  
    createPlayer(player: CreatePlayer): Observable<Player>{
      return this.http.post<Player>(`${this.API}/`, player);
    }

    getPlayers(): Observable<Player[]>{
      return this.http.get<Player[]>(`${this.API}/`);
    }

    updatePlayer(player: CreatePlayer){
      return this.http.put(`${this.API}/`, player);
    }

    deletePlayer(id: string){
      return this.http.delete(`${this.API}/${id}`,);
    }

    updateRankedTier(id: string){
      return this.http.patch(`${this.API}/${id}`, {id});
    }
}
