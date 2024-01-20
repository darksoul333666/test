import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { LoadCharacters, SelectCharacters } from 'src/app/redux/actions/character.actions';
import { CharacterState, CharacterStateModel } from 'src/app/redux/state/character.state';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  public characters$: Observable<Character[]>;
  public loading$: Observable<boolean>;
  constructor(private store: Store) {
    this.characters$ = this.store.select(CharacterState.getCharacters);
    this.loading$ = this.store.select((state: { characters: CharacterStateModel }) =>
      state.characters.loading);

  }

  ngOnInit(): void {
    this.loadCharacters();
    this.onCharacterLoaded();
    this.loading$.subscribe((loading) => console.log(loading));
  }

  public loadCharacters(): void {
    this.store.dispatch(new LoadCharacters());
  }

  public onCharacterLoaded(): void {
    this.characters$.subscribe((characters:any) => {
      console.log(characters);
      this.store.dispatch(new SelectCharacters({characters: characters?.results?.splice(0, 2)}))
    })
  }
}
