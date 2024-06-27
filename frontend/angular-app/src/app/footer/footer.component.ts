import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
   authService = inject(AuthService);
   router = inject(Router);

   ngOnInit() {
    console.log(this.router.url);
    
   }
}
