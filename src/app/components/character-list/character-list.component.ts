import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { LoadCharacters, SelectCharacters, ResetSelect, RemoveCharacter } from 'src/app/redux/actions/character.actions';
import { CharacterState, CharacterStateModel } from 'src/app/redux/state/character.state';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  public characters$: Observable<Character[]>;
  public characters:Character[] = [];
  public checkboxItems: any[] = [];
  public loading$: Observable<boolean>;
  public charactersSelected$: Observable<Character[]>;
  public charactersSelected: BehaviorSubject<any> = new BehaviorSubject([]);
  public loading: boolean = true;
  constructor(private store: Store, private router: Router, 
    private toastr: ToastrService) {
    this.characters$ = this.store.select(CharacterState.getCharacters);
    this.loading$ = this.store
    .select((state: { characters: CharacterStateModel }) => state.characters.loading);
    this.charactersSelected$ = this.store.select(CharacterState.getCharactersSelected);
  }

  ngOnInit(): void {
    this.loadCharacters();
    this.onCharacterLoaded();
    this.loading$.subscribe((loading) => this.loading = loading);
    this.charactersSelected$.subscribe((charactersSelected) => 
      this.charactersSelected.next(charactersSelected));
  }

  public toggleSelection(character: any) {
    const characters = this.charactersSelected.value
    const isIncluded = characters.some((item:Character) => item.id === character.id);
    if(!isIncluded) {
      if(characters.length < 6) this.store.dispatch(new SelectCharacters({characters: [character]}))
      else this.toastr.warning('Solo se pueden seleccionar hasta tres elementos de la lista.', 'Haz alcanzado el límite');
    } else this.store.dispatch(new RemoveCharacter({id: character.id}));
  }

  public loadCharacters(): void {
    this.store.dispatch(new LoadCharacters());
  }

  public onCharacterLoaded(): void {
    this.characters$.subscribe((characters:any) => {
      this.characters = characters?.results
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

  public handleDeleteSelection(){
    const selectedItems = this.charactersSelected.value.length;
    this.checkboxItems.forEach((item:any, id:number)=>{
      if(item.selected === true) this.checkboxItems[id].selected = false;
    })
    this.store.dispatch(new ResetSelect());
    if(selectedItems > 0)this.toastr.success('Personajes seleccionados eliminados');
  }
}
