import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { RestApiService } from '../_services/rest-api/rest-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  restapi = inject(RestApiService);
  authService = inject(AuthService);
  submitted = false;
  loginForm = new FormGroup({
    usern: new FormControl('', [Validators.required]),
    passw: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]) 
  });

  handleLogin() {
    this.submitted = true;
    if(this.loginForm.invalid){
      this.toastr.error("The provided data is invalid!", "ERROR: Invalid data");
    } else {
      this.restapi.login({
        user: this.loginForm.value.usern as string,
        passw: this.loginForm.value.passw as string
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token);
        },
        error: (err) => {
          this.toastr.error("Insert valid username and password", "ERROR: Invalid credentials");
        },
        complete: () => {
          this.toastr.success("You can now browse the HiveMind", `Welcome, ${this.loginForm.value.usern}!`);
          this.router.navigateByUrl("/home")
        }
      });
    }
  }

}
