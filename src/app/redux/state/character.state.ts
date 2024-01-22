import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { 
LoadCharacters, 
LoadCharactersSuccess, 
LoadCharactersError,
SelectCharacters,
ResetSelect, 
GetCharactersSelected,
RemoveCharacter} from '../actions/character.actions';
import Character from '../../interfaces/character.interface';
import { tap, catchError } from 'rxjs/operators';
import { CharacterService } from 'src/app/services/character.service';

export interface CharacterStateModel {
  characters: Character[];
  charactersSelected: Character[];
  loading: boolean;
  error: any;
}

@State<CharacterStateModel>({
  name: 'characters',
  defaults: {
    characters: [],
    loading: false,
    error: null,
    charactersSelected: [],
  },
})
@Injectable()
export class CharacterState {
  constructor(private characterService: CharacterService) {}

  @Selector()
  static getCharacters(state: CharacterStateModel): Character[] {
    return state.characters;
  }

  @Selector()
  static getCharactersSelected(state: CharacterStateModel): Character[] {
    return state.charactersSelected;
  }



  @Action(LoadCharacters)
  loadCharacters(ctx: StateContext<CharacterStateModel>) {
    console.log("entrando a la accion");
    
    ctx.patchState({
      loading: true,
    });

    return this.characterService.getCharacters().pipe(
      tap((characters) => {
        ctx.dispatch(new LoadCharactersSuccess({ characters }));
      }),
      catchError((error) => {
        ctx.dispatch(new LoadCharactersError({ error }));
        throw error;
      })
    );
  }

  @Action(LoadCharactersSuccess)
  loadCharactersSuccess(ctx: StateContext<CharacterStateModel>, action: LoadCharactersSuccess) {
    const { characters } = action.payload;
    ctx.patchState({
      characters,
      loading: false,
      error: null,
    });
  }

  @Action(LoadCharactersError)
  loadCharactersError(ctx: StateContext<CharacterStateModel>, action: LoadCharactersError) {
    const { error } = action.payload;
    ctx.patchState({
      loading: false,
      error,
    });
  }

  @Action(SelectCharacters)
  selectCharacters(ctx: StateContext<CharacterStateModel>, action: SelectCharacters) {
    const { characters } = action.payload;
    const currentState = ctx.getState();
    const updatedCharactersSelected = [
      ...currentState.charactersSelected, ...characters];
    ctx.patchState({
      charactersSelected:  updatedCharactersSelected,
    });
  }

  @Action(RemoveCharacter)
  removeCharacter(ctx: StateContext<CharacterStateModel>, action: RemoveCharacter) {
    const { id } = action.payload;
    const currentState = ctx.getState();
    const updatedCharactersSelected = currentState.charactersSelected
    .filter((item:Character) => item.id !== id);
    ctx.patchState({
      charactersSelected:  updatedCharactersSelected,
    });
  }

  @Action(GetCharactersSelected)
  getCharactersSelected(ctx: StateContext<CharacterStateModel>) {
    return ctx.getState().charactersSelected;
  }

  @Action(ResetSelect)
  resetSelect(ctx: StateContext<CharacterStateModel>) {
    ctx.patchState({
      charactersSelected: [],
    });
  }
  
}
