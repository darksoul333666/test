// // character.state.ts
// import { State, Action, StateContext, Selector } from '@ngxs/store';
// import { tap } from 'rxjs/operators';
// import { ApiService } from '...'; // Importa tu servicio de la API
// import * as characterActions from  '../actions/character.actions'
// import * as types from '../types/character.types'; // Importa tus tipos

// interface CharacterStateModel {
//   characters: any[];
//   loading: boolean;
// }

// @State<CharacterStateModel>({
//   name: 'characters',
//   defaults: {
//     characters: [],
//     loading: false,
//   },
// })
// export class CharacterState {
//   constructor(private apiService: ApiService) {}

//   @Selector()
//   static getCharacters(state: CharacterStateModel) {
//     return state.characters;
//   }

//   @Selector()
//   static isLoading(state: CharacterStateModel) {
//     return state.loading;
//   }

//   @Action(characterActions.LoadCharacters)
//   loadCharacters(ctx: StateContext<CharacterStateModel>) {
//     ctx.patchState({ loading: true });

//     return this.apiService.get('https://rickandmortyapi.com/api/character').pipe(
//       tap((response: any) => {
//         ctx.dispatch(new characterActions.LoadCharactersSuccess({ characters: response.results }));
//       }),
//     );
//   }

//   @Action(characterActions.LoadCharactersSuccess)
//   loadCharactersSuccess(ctx: StateContext<CharacterStateModel>, action: characterActions.LoadCharactersSuccess) {
//     ctx.patchState({ characters: action.characters, loading: false });
//   }

//   @Action(characterActions.LoadCharactersError)
//   loadCharactersError(ctx: StateContext<CharacterStateModel>, action: characterActions.LoadCharactersError) {
//     ctx.patchState({ loading: false });
//     console.error(action.error);
//   }
// }
