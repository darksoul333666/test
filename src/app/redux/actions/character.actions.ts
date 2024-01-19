// character.actions.ts
import { Injectable } from '@angular/core';

export class LoadCharacters {
  static readonly type = '[Character] Load Characters';
}

export class LoadCharactersSuccess {
  static readonly type = '[Character] Load Characters Success';

  constructor(public payload: { characters: any[] }) {}
}

export class LoadCharactersError {
  static readonly type = '[Character] Load Characters Error';

  constructor(public payload: { error: any }) {}
}
