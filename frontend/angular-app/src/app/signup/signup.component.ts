import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { RestApiService } from '../_services/rest-api/rest-api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  restapi = inject(RestApiService);
  router = inject(Router);
  submitted=false;
  signupForm = new FormGroup({
  usern: new FormControl('', [Validators.required]),
  passw: new FormControl('', [
    Validators.required, 
    Validators.minLength(4), 
    Validators.maxLength(16)
  ])
})

handleSignup() {
  this.submitted = true;
  if(this.signupForm.invalid) {
    this.toastr.error("The provided data is invalid!", "ERROR: Invalid data");
  } else {
    this.restapi.signup({
      user: this.signupForm.value.usern as string, 
      passw: this.signupForm.value.passw as string
    }).subscribe({
      error: (err) => {
        this.toastr.error("Username inserted is already taken", "ERROR: Could not create new account!");
      },
      complete: () => {
        this.toastr.success("Your new account is up and running", `Welcome, ${this.signupForm.value.usern}!`);
        this.router.navigateByUrl("/login");
      }
    })
  }
}

}
