import Character from "src/app/interfaces/character.interface";
import { GET_CHARACTERS_SELECTED, LOAD_CHARACTERS, LOAD_CHARACTERS_ERROR, LOAD_CHARACTERS_SUCCESS, RESET_SELECT, SELECT_CHARACTER } from "../types/character.types";

export class LoadCharacters {
  static readonly type = LOAD_CHARACTERS;
}

export class LoadCharactersSuccess {
  static readonly type = LOAD_CHARACTERS_SUCCESS;
  constructor(public payload: { characters: Character[] }) {}
}

export class LoadCharactersError {
  static readonly type = LOAD_CHARACTERS_ERROR;
  constructor(public payload: { error: any }) {}
}

export class SelectCharacters {
  static readonly type = SELECT_CHARACTER;
  constructor(public payload: { characters: Character[] }) {}
}

export class ResetSelect {
  static readonly type = RESET_SELECT;
  
}

export class GetCharactersSelected {
  static readonly type = GET_CHARACTERS_SELECTED;
}