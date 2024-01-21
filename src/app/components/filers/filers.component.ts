import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-filers',
  templateUrl: './filers.component.html',
  styleUrls: ['./filers.component.scss']
})
export class FilersComponent {
  colorControl = new FormControl('primary' as ThemePalette);

}
