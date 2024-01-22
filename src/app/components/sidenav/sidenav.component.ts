import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  selectedOption: string = 'inicio'; // Puedes inicializarlo con la opción por defecto

  constructor(private router: Router) {}

  isSelected(option: string): boolean {
    return this.selectedOption === option;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  navigateTo(option: string): void {
    this.router.navigate(['/characters', option]);
  }
}
