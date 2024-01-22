import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { CharacterState } from 'src/app/redux/state/character.state';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() item: any;
  @Output() toggleEmit = new EventEmitter<number>();
  public charactersSelected$: Observable<Character[]>;
  public charactersSelected: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(
    private store: Store,
  ) {
    this.charactersSelected$ = this.store.select(CharacterState.getCharactersSelected);
  }

  ngOnInit(): void {
    this.charactersSelected$.subscribe((charactersSelected) => 
      this.charactersSelected.next(charactersSelected));
  }
  public onToggleSelection(id:number): void {
    this.toggleEmit.emit(id)
  }

  public isSelectedCharacter(id: number): boolean {
    return this.charactersSelected.value.some((item:Character) => item.id === id);
  }
}
