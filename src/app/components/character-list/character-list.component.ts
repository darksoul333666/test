import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { LoadCharacters, SelectCharacters } from 'src/app/redux/actions/character.actions';
import { CharacterState, CharacterStateModel } from 'src/app/redux/state/character.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  public characters$: Observable<Character[]>;
  public loading$: Observable<boolean>;
  public charactersSelected$: Observable<Character[]>;

  constructor(private store: Store, private router: Router) {
    this.characters$ = this.store.select(CharacterState.getCharacters);
    this.loading$ = this.store.select((state: { characters: CharacterStateModel }) => state.characters.loading);

    this.charactersSelected$ = this.store.select(CharacterState.getCharactersSelected);

  }

  ngOnInit(): void {
    this.loadCharacters();
    this.onCharacterLoaded();
    this.loading$.subscribe((loading) => this.loading = loading);
  }

  checkboxItems: any[] = [];
  loading: boolean = true;

  public toggleSelection(item: number) {
    let selectedItems = this.checkboxItems.filter( item => item.selected === true);
    if(selectedItems.length <= 2 || this.checkboxItems[item-1].selected === true) {
      this.checkboxItems[item-1].selected = !this.checkboxItems[item-1].selected

    
    }
    else{

    }
  }

  public loadCharacters(): void {
    this.store.dispatch(new LoadCharacters());
  }

  public onCharacterLoaded(): void {
    this.characters$.subscribe((characters:any) => {
      this.checkboxItems = characters?.results?.map( (item:any) => ({...item, selected: false}));
    })
  }

  public handleButtonClick() {
    const selectedItems = this.checkboxItems.filter( item => item.selected === true)

      selectedItems.forEach(function(obj) {
        delete obj.selected;
      });
      
      this.store.dispatch(new SelectCharacters({characters: selectedItems}))
    this.router.navigate(['characters/:selectedItems'])
  }
}
