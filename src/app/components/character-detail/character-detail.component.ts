import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { CharacterState } from 'src/app/redux/state/character.state';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  public charactersSelected$: Observable<Character[]>;
  constructor(
    private store: Store
  ) {
    this.charactersSelected$ = this.store.select(CharacterState.getCharactersSelected);
  }
ngOnInit(): void {
 this.charactersSelected$.subscribe((charactersSelected) => console.log(charactersSelected));
}
}
