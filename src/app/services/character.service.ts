
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Character from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  constructor(private http: HttpClient) {}

  public getCharacters(): Observable<any[]> {
    return this.http.get<Character[]>(this.apiUrl).pipe((response) => response);
  }
}

interface ApiResponse {
  info: Info;
  results: Character[];
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}