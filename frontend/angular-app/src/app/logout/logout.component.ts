import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router)

  ngOnInit() {
    if(! this.authService.isUserAuthenticated()){
      this.toastr.warning("You are currently not logged in!");
      this.router.navigateByUrl("/");
    } else {
      this.toastr.warning(`See you soon, ${this.authService.user()}`, "You have been logged out!");
      this.authService.logout();
      this.router.navigateByUrl("/");
    }
  }

}
