import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../_services/rest-api/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-connect-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connect-page.component.html',
  styleUrl: './connect-page.component.scss'
})
export class ConnectPageComponent {

  submitted = false;
  restapi = inject(RestApiService);
  toastr = inject(ToastrService);
  router = inject(Router);
  authservice = inject(AuthService);

  ideaForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    isMarkdown: new FormControl<boolean>(false, [
      Validators.required
    ])
  })


  handleConnect() {
    this.submitted = true;
    if(this.ideaForm.invalid) {
      this.toastr.error("The provided data is invalid!", "ERROR: Invalid data");
    } else {
      this.restapi.createIdea({
        title: this.ideaForm.value.title as string,
        description: this.ideaForm.value.description as string,
        isMarkDown: this.ideaForm.value.isMarkdown as boolean,
        UserUsername: this.authservice.user() as string,
        upvotes: 0, downvotes: 0, comments: 0
      }).subscribe({
        next: (idea) => {
          this.toastr.success(`Idea: ${idea.title}`, "Connection complete!");
          this.submitted = false;
          this.ideaForm.setValue({title: "", description: "", isMarkdown: false});
        },
        error: (err) => {
          if (err.status === 401) {
            this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
            this.router.navigateByUrl("/login");
          } else {
            this.toastr.error(err.message, err.statusText);
          }
        },
        complete: () => {
            this.ideaForm.value.title = '';
            this.ideaForm.value.description = '';
            this.ideaForm.value.isMarkdown = false;
            this.router.navigateByUrl("/home");
        }
      })
    }

  }

}
