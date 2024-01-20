import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { CharacterState, CharacterStateModel } from 'src/app/redux/state/character.state';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  public charactersSelected$: Observable<Character[]>;
  public loading$: Observable<boolean>;

  constructor(
    private store: Store
  ) {
    this.charactersSelected$ = this.store.select(CharacterState.getCharactersSelected);
    this.loading$ = this.store.select((state: { characters: CharacterStateModel }) =>
      state.characters.loading);
  }
  ngOnInit(): void {
    this.charactersSelected$.subscribe((charactersSelected) => this.characters = charactersSelected);
    this.loading$.subscribe((loading) => this.loading = loading);
  }

  characters: any[] = [];
  loading: boolean = true;

}
