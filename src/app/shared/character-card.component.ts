import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Character from 'src/app/interfaces/character.interface';
import { LoadCharacters, SelectCharacters, ResetSelect } from 'src/app/redux/actions/character.actions';
import { CharacterState, CharacterStateModel } from 'src/app/redux/state/character.state';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() item: any;
  @Output() toggleEmit = new EventEmitter<number>()
  constructor() {
   
  }

  public onToggleSelection(id:number): void {
    this.toggleEmit.emit(id)
  }
}
