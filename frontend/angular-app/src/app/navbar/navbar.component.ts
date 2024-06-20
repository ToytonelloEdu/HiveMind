import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isOpen = false;
  isDropdownOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Closes the toggled navbar when a user clicks on a link
   */
  handleNavigationClick(){
    this.isOpen = false;
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
